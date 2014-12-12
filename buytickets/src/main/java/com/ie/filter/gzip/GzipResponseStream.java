package com.ie.filter.gzip;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.GZIPOutputStream;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
/**
 * 压缩GZIP
 * @author zbn
 * @create 2012-4-1 1:11:17
 */
public class GzipResponseStream extends ServletOutputStream {
	private Logger log = LoggerFactory.getLogger(this.getClass());
	public GzipResponseStream(HttpServletResponse httpservletresponse)
			throws IOException {
		baos = null;
		gzipstream = null;
		closed = false;
		response = null;
		output = null;
		closed = false;
		response = httpservletresponse;
		output = httpservletresponse.getOutputStream();
		baos = new ByteArrayOutputStream();
		gzipstream = new GZIPOutputStream(baos);
	}

	public void close() throws IOException {
		if (closed) {
			throw new IOException("This output stream has already been closed");
		} else {
			gzipstream.finish();
			byte abyte0[] = baos.toByteArray();
			response.addHeader("Content-Length",
					Integer.toString(abyte0.length));
			response.addHeader("Content-Encoding", "gzip");
			output.write(abyte0);
			output.flush();
			output.close();
			closed = true;
			return;
		}
	}

	public void flush() throws IOException {
		if (closed) {
			throw new IOException("Cannot flush a closed output stream");
		} else {
			gzipstream.flush();
			return;
		}
	}

	public void write(int i) throws IOException {
		if (closed) {
			throw new IOException("Cannot write to a closed output stream");
		} else {
			gzipstream.write((byte) i);
			return;
		}
	}

	public void write(byte abyte0[]) throws IOException {
		write(abyte0, 0, abyte0.length);
	}

	public void write(byte abyte0[], int i, int j) throws IOException {
		log.debug("文件压缩中。。。");
		if (closed) {
			log.debug("文件压缩失败！！！");
			throw new IOException("Cannot write to a closed output stream");
		} else {
			gzipstream.write(abyte0, i, j);
			log.debug("文件压缩成功。。。");
			return;
		}
	}

	public boolean closed() {
		return closed;
	}

	public void reset() {
	}

	protected ByteArrayOutputStream baos;
	protected GZIPOutputStream gzipstream;
	protected boolean closed;
	protected HttpServletResponse response;
	protected ServletOutputStream output;
}