var express = require('express')
var fs = require('fs')
var path = require('path')
var child_process = require('child_process')
var app = express()

app.get('/:bot', function (req, res) {
	fs.stat(req.params.bot, function(err, stats){
		if (!err && stats.isFile()) {
			var file = path.join(__dirname, req.params.bot)
			var child = child_process.spawn(file)
			child.stdout.pipe(res)
			child.stderr.pipe(process.stderr)
			child.stdin.write(JSON.stringify(req.query))
			child.stdin.end()
		}else{
			res.send('bot doesnt exist')
		}

	})
})

app.listen(3000)