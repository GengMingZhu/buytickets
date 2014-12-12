package com.ie.utils;

import java.io.IOException;
import java.util.List;
import java.util.Properties;

import org.apache.http.Header;
import org.apache.http.message.BasicHeader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HttpUtils {
	
	Logger logger = LoggerFactory.getLogger(HttpUtils.class);
	
	public static Header[] buildHeader(Header referHeader,
			Header[] cookieHeaders) {
		Header[] headers = new Header[1 + cookieHeaders.length];
		headers[0] = referHeader;
		for (int i = 0; i < cookieHeaders.length; i++) {
			headers[i + 1] = cookieHeaders[i];
		}
		return headers;
	}

	/**
	 * @Description: 获取http头信息
	 * @author 耿明柱
	 * @Title: HttpUtils.java
	 * @date 2014-12-12 下午5:41:55
	 * @return Header
	 * @throws
	 */
	public static Header makeReferHeader(String refer) {
		Header referHeader = new BasicHeader("Referer", refer);
		return referHeader;
	}
}
