<%@ page contentType="text/html; charset=utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title></title>
</head>
<body>
<div class="container-fluid">
  <div class="row">
	<form class="form-horizontal" role="form">
	<div class="form-group">
    	<label for="inputEmail3" class="col-sm-2 control-label">Email</label>
	    <div class="col-sm-3">
	      <input type="email" class="form-control " id="email" placeholder="Email">
	    </div>
	</div>
	<div class="form-group">
		<label for="inputPassword" class="col-sm-2 control-label">Password</label>
		<div class="col-sm-3">
			<input type="password" class="form-control" id="password" placeholder="Password">
		</div>
  	</div>
  	<div class="form-group">
		<label for="inputCode" class="col-sm-2 control-label">
			<img />
		</label>
		<div class="col-sm-3">
			<input type="text" class="form-control" id="code" placeholder="验证码">
		</div>
  	</div>
	<div class="form-group">
	    <div class="col-sm-offset-2 col-sm-10">
	      <button type="submit" class="btn btn-default" id="submit">Sign in</button>
	    </div>
	</div>
	</form>
  </div>
</div>
</body>
</html>