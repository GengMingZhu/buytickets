package com.ie.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.http.Consts;
import org.apache.http.Header;
import org.apache.http.HeaderElement;
import org.apache.http.HttpEntity;
import org.apache.http.HttpException;
import org.apache.http.HttpRequest;
import org.apache.http.HttpRequestInterceptor;
import org.apache.http.HttpResponse;
import org.apache.http.HttpResponseInterceptor;
import org.apache.http.NameValuePair;
import org.apache.http.RequestLine;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.GzipDecompressingEntity;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicHeader;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.protocol.HttpContext;

/**
 * @author xujsh(xjs250@163.com)
 *
 */
public class HttpClientUtil {
	
	public static HttpClient getHttpClient(final String host)throws Exception{
		DefaultHttpClient httpclient = new DefaultHttpClient();
		httpclient.addRequestInterceptor(new HttpRequestInterceptor() {
			public void process(final HttpRequest request,
					final HttpContext context) throws HttpException,
					IOException {
				if (!request.containsHeader("Accept")) {
					request.addHeader("Accept", "*/*");
				}
				if (request.containsHeader("User-Agent")) {
					request.removeHeaders("User-Agent");
				}
				if (request.containsHeader("Connection")) {
					request.removeHeaders("Connection");
				}
				if (request.containsHeader("Host")) {
					request.removeHeaders("Host");
				}
				request.addHeader("Host", host);
				request.addHeader("User-Agent","Mozilla/5.0 (Windows NT 5.1; rv:8.0) Gecko/20100101 Firefox/8.0");
				request.addHeader("Connection", "keep-alive");
			}
		});
		return httpclient;
	}
	
	
	private static HttpClient getHttpsClient(final String host)throws Exception{
		DefaultHttpClient httpclient = new DefaultHttpClient();
		TrustManager easyTrustManager = new X509TrustManager() {
		   public void checkClientTrusted(java.security.cert.X509Certificate[]x509Certificates, String s) throws java.security.cert.CertificateException {
		    }
		   public void checkServerTrusted(java.security.cert.X509Certificate[]x509Certificates, String s) throws java.security.cert.CertificateException {
		    }
		   public java.security.cert.X509Certificate[] getAcceptedIssuers() {
		       return null;
		    }
		};
		SSLContext sslcontext =SSLContext.getInstance("TLS");
		sslcontext.init(null, new TrustManager[]{easyTrustManager}, null);
		SSLSocketFactory sf = new SSLSocketFactory(sslcontext);
		Scheme sch = new Scheme("https",443,sf);
		httpclient.getConnectionManager().getSchemeRegistry().register(sch);
	
		httpclient.addRequestInterceptor(new HttpRequestInterceptor() {
			public void process(final HttpRequest request,
					final HttpContext context) throws HttpException,
					IOException {
				request.addHeader("Accept", "application/json, text/javascript, */*");
				request.addHeader("Accept-Charset", "GBK,utf-8;q=0.7,*;q=0.3");
				request.addHeader("Accept-Encoding", "gzip,deflate,sdch");
				request.addHeader("Accept-Language", "zh-CN,zh;q=0.8");
				request.addHeader("Cache-Control", "no-cache");
				request.addHeader("Connection", "keep-alive");
				request.addHeader("Host", host);//dynamic.12306.cn
				request.addHeader("Pragma", "no-cache");
				request.addHeader("User-Agent","Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11");
			}
		});
		//添加处理gzip响应的拦截器
		httpclient.addResponseInterceptor(new HttpResponseInterceptor() {
            public void process(final HttpResponse response,final HttpContext context) throws HttpException, IOException {
                HttpEntity entity = response.getEntity();
                if (entity == null)return;
                Header ceheader = entity.getContentEncoding();
                if (ceheader == null)return;
                HeaderElement[] codecs = ceheader.getElements();
                for (int i = 0; i < codecs.length; i++) {
                    if (codecs[i].getName().equalsIgnoreCase("gzip")) {
                        response.setEntity(new GzipDecompressingEntity(response.getEntity()));
                        return;
                    }
                }
            }

        });
		return httpclient;
	}
	
	public static HttpResponse sendPost(String url,Map<String,String> dataMap,Header... headers)throws Exception{
		HttpPost post = new HttpPost(url);
		return sendRequest(post,dataMap,headers);
	}
	
	public static HttpResponse sendGet(String url,Header...headers)throws Exception{
		HttpGet get = new HttpGet(url);
		return sendRequest(get,(List<NameValuePair>)null,headers);
	}
	
	public static HttpResponse sendPost(String url,List<NameValuePair> nvps,Header... headers)throws Exception{
		HttpPost post = new HttpPost(url);
		return sendRequest(post,nvps,headers);
	}
	
	public static HttpResponse sendRequest(HttpRequestBase request,Map<String,String> dataMap,Header...headers)throws Exception{
		List <NameValuePair> nvps = new ArrayList <NameValuePair>();
		if(dataMap != null && dataMap.size() > 0){
			for(Map.Entry<String,String> entry : dataMap.entrySet()){
				String key = entry.getKey();
				String value = entry.getValue();
	            nvps.add(new BasicNameValuePair(key,value ));
			}
		}
		return sendRequest(request,nvps,headers);
	}
	
	public static HttpResponse sendRequest(HttpRequestBase request,List<NameValuePair> nvps,Header...headers)throws Exception{
		RequestLine requestLine = request.getRequestLine();
		String uri = requestLine.getUri();
		String host = getHost(uri);
		HttpClient httpclient = null;
		if(uri.toLowerCase().startsWith("https")){
			httpclient = getHttpsClient(host);
		}else{
			httpclient = getHttpClient(host);
		}
		if(nvps != null && nvps.size() > 0){
			((HttpPost)request).setEntity(new UrlEncodedFormEntity(nvps, Consts.UTF_8));
			headers = Utils.buildHeader(new BasicHeader("Content-Type","application/x-www-form-urlencoded"),headers);
		}
		if(headers != null && headers.length > 0){
			request.setHeaders(headers);
		}
		return  httpclient.execute(request);
	}
	
	public static Header[] buildRequestCookieHeader(HttpResponse response){
		Header[] responseHeaders = response.getHeaders("Set-Cookie");
		if(responseHeaders == null || responseHeaders.length <= 0){
			return null;
		}
		String JSESSIONID = "";
		String BIGipServerotn = "";
		for(int i=0;i<responseHeaders.length;i++){
			String cookieValue = responseHeaders[i].getValue();
			if(cookieValue.indexOf("JSESSIONID") > -1){
				JSESSIONID=cookieValue.substring(cookieValue.indexOf("JSESSIONID")+"JSESSIONID".length()+1,cookieValue.indexOf(";"));
			}else if(cookieValue.indexOf("BIGipServerotn") > -1){
				BIGipServerotn=cookieValue.substring(cookieValue.indexOf("BIGipServerotn")+"BIGipServerotn".length()+1,cookieValue.indexOf(";"));
			}
		}
		HttpUtil.JSESSIONID = JSESSIONID;
		HttpUtil.BIGipServerotn=BIGipServerotn;
		String cookie = "JSESSIONID="+JSESSIONID+"; BIGipServerotn="+BIGipServerotn;
		return new Header[]{new BasicHeader("Cookie",cookie)} ;
	}
	
	private static String getHost(String uri){
		int start = uri.indexOf("://")+3;
		int end = uri.indexOf("/",start);
		String hostport = uri.substring(start,end);
		int colonpos = hostport.indexOf(":");
		if(colonpos >= 0){
			return hostport.substring(0,colonpos);
		}else{
			return hostport;
		}
	}
	
	public static void main(String[] args) throws Exception {
		String uri = "http://dynamic.12306.cn:443/121212.jsp";
		System.out.println(getHost(uri));
		uri = "http://dynamic.12306.cn/121212.jsp";
		System.out.println(getHost(uri));
    }
	
}
