package com.ie.filter.gzip;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
/**
 * 压缩GZIP过滤器
 * @author zbn
 * @create 2012-4-1 1:11:17
 */
public class GzipFilter implements Filter {
	private Logger log = LoggerFactory.getLogger(this.getClass());

	@Override
	public void destroy() {

	}

	@Override
	public void doFilter(ServletRequest servletrequest,
			ServletResponse servletresponse, FilterChain filterchain)
			throws IOException, ServletException {

		if (servletrequest instanceof HttpServletRequest) {
			HttpServletRequest httpservletrequest = (HttpServletRequest) servletrequest;
			HttpServletResponse httpservletresponse = (HttpServletResponse) servletresponse;
			String s = httpservletrequest.getHeader("accept-encoding");
			if (s != null && s.indexOf("gzip") != -1) {
				String path = httpservletrequest.getRequestURI();
				//log.debug("检查文件:" + path);
				GzipResponseWrapper gzipresponsewrapper = new GzipResponseWrapper(
						httpservletresponse);
				filterchain.doFilter(servletrequest, gzipresponsewrapper);
				gzipresponsewrapper.finishResponse();
				if (gzipresponsewrapper.stream==null) {
					//log.debug("文件已有缓存，不需要压缩");
				}
				return;
			}
			filterchain.doFilter(servletrequest, servletresponse);
		}

	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {

	}

}
