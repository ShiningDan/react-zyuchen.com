var gulp = require("gulp"),
  webpack = require("webpack"),
  gutil = require('gulp-util'),
  webpackConfig = require("./webpack.config.js"),
  nodemon = require('gulp-nodemon'),
  browserSync  = require('browser-sync').create(),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  atImport = require('postcss-import'),
  mqpacker = require('css-mqpacker'),
  cssnano = require('cssnano'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  webp = require('gulp-webp'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  base64 = require('postcss-base64');



// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task('css', function () { 
  var processors = [autoprefixer, atImport, mqpacker, base64({extensions: ['.jpg']}), cssnano]; 
  return gulp.src('./view/output/css/*-combo.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./www/static/css')); 
});


gulp.task('webp', function () {
    return gulp.src('./view/output/img/**/**/*.{png,jpg}')
        .pipe(webp())
        .pipe(gulp.dest('./www/static/img'));
});

gulp.task('imagemin', function () {
    gulp.src('./view/output/img/**/**/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            // optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            // progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            // interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('./www/static/img'));
});

gulp.task('default', ['webpack:build-dev', 'imagemin', 'webp', 'css', 'script', 'browser-sync'], function() {
  gulp.watch(['./view/**/*.*', './app/**/*.js', './app/**/*.jsx','./view/output/js/*.js', './app.js', './redisFetch.js'], ['webpack:build-dev', 'css', 'script', 'bs-delay'])
});

gulp.task('script', function() {
  return gulp.src('./view/output/js/*.js')
    .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(uglify())
    .pipe(gulp.dest('./www/static/js'));
})

gulp.task('bs-delay', function() {
  setTimeout(function() {
    browserSync.reload({stream: false});
  }, 1500);
})

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
		  proxy: "http://localhost:8000",
      // files: ["./**/*.*"],
      browser: "google chrome",
      port: 7000,
      rewriteRules: [
        {
            match: /Content-Security-Policy/,
            fn: function (match) {
                return "DISABLED-Content-Security-Policy";
            }
        }
      ],
  })
})

gulp.task('nodemon',function(cb) {
  let started = false;
  return nodemon({
    script: './app.js',
    ignore: ['README.md', 'node_modules/**', '.DS_Store'], 
    env: { 'NODE_ENV': 'development' },
  }).on('start', function() {
    if (!started) {
      cb();
      started = true;
    }
  })
})