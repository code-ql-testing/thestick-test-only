<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Tasks App</title>

<style type="text/css">

body {
 background-color: #fff;
 margin: 40px;
 font-family: Lucida Grande, Verdana, Sans-serif;
 font-size: 14px;
 color: #4F5155;
}

a {
 color: #003399;
 background-color: transparent;
 font-weight: normal;
}

h1 {
 color: #444;
 background-color: transparent;
 border-bottom: 1px solid #D0D0D0;
 font-size: 16px;
 font-weight: bold;
 margin: 24px 0 2px 0;
 padding: 5px 0 6px 0;
}

code {
 font-family: Monaco, Verdana, Sans-serif;
 font-size: 12px;
 background-color: #f9f9f9;
 border: 1px solid #D0D0D0;
 color: #002166;
 display: block;
 margin: 14px 0 14px 0;
 padding: 12px 10px 12px 10px;
}

</style>
</head>
<body>

<h1>Welcome to Task Scheduler!</h1>

<p>Links.</p>

<ul>
	<li><a href="<?php echo site_url('tasks');?>">Tasks App</a> - Task Client Application</li>
	<li><a href="<?php echo site_url('task_scaffold');?>">Tasks Scaffold</a> - Task Scaffolding System</li>
	<li><a href="<?php echo site_url('api/tasks');?>">API Tasks</a> - defaulting to JSON</li>
</ul>

<p><br />Page rendered in {elapsed_time} seconds</p>

<script src="http://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
</body>
</html>