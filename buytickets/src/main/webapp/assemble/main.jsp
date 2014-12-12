<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://www.opensymphony.com/sitemesh/decorator"
	prefix="sitemesh"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta http-equiv="Cache-Control" content="no-store" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Expires" content="0" />
<!-- 从被装饰页面获取title标签内容,并设置默认值-->
<title><sitemesh:title default="购票平台" /></title>
<!-- 从被装饰页面获取head标签内容 -->
<sitemesh:head />
</head>
<body>
	<!-- 从被装饰页面获取body标签内容 -->
	<%@include file="header.jsp"%>
	<sitemesh:body />
	<%@include file="footer.jsp"%>
</body>
</html>