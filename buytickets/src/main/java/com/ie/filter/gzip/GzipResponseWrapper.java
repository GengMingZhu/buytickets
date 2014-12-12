package com.ie.filter.gzip;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
/**
 * 压缩GZIP
 * @author zbn
 * @create 2012-4-1 1:11:17
 */
public class GzipResponseWrapper extends HttpServletResponseWrapper {

	public GzipResponseWrapper(HttpServletResponse httpservletresponse) {
		super(httpservletresponse);
		origResponse = null;
		stream = null;
		writer = null;
		origResponse = httpservletresponse;
	}

	public ServletOutputStream createOutputStream() throws IOException {
		return new GzipResponseStream(origResponse);
	}

	public void finishResponse() {
		try {
			if (writer != null)
				writer.close();
			else if (stream != null)
				stream.close();
		} catch (IOException ioexception) {
		}
	}

	public void flushBuffer() throws IOException {
		stream.flush();
	}

	public ServletOutputStream getOutputStream() throws IOException {
		if (writer != null)
			throw new IllegalStateException("getWriter() has already been called!");
		if (stream == null)
			stream = createOutputStream();
		return stream;
	}

	public PrintWriter getWriter() throws IOException {
		if (writer != null)
			return writer;
		if (stream != null) {
			throw new IllegalStateException("getOutputStream() has already been called!");
		} else {
			stream = createOutputStream();
			writer = new PrintWriter(new OutputStreamWriter(stream, "UTF-8"));
			return writer;
		}
	}

	public void setContentLength(int i) {
	}

	protected HttpServletResponse origResponse;
	protected ServletOutputStream stream;
	protected PrintWriter writer;
}