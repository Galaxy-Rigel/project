/**
 * Created by Stone on 2016/8/15.
 */
var gulp = require('gulp'),
    cssversion = require('gulp-make-css-url-version'),  // css里路径版本号
    minifycss = require('gulp-minify-css'),  // 压缩css
    uglify = require('gulp-uglify'),  // 压缩js
    clean = require('gulp-clean'), // 清理文件夹
    concat = require('gulp-concat'),  // 合并文件
    rename = require('gulp-rename'), // 重命名文件
    jshint = require('gulp-jshint'), // 检测js:jshint
    replace = require('gulp-replace'); // 替换

//压缩-重命名-css
gulp.task('min-concat-rename-css', function () {
    gulp.src('./public/css/*.css')
        .pipe(cssversion())  //css路径加一个版本号
        .pipe(rename({"suffix": ".min"}))//重命名  main.min.css
        .pipe(minifycss()) //对这个css做压缩处理
        .pipe(gulp.dest('./public-v/css')); //输出
});

//压缩重命名js
gulp.task('min-uglify-rename-js', function () {
    return gulp.src(['./public/js/*.js', './www/usercenter/js/*.js'], {base: './www'})
        .pipe(uglify())  //压缩js
        .pipe(rename({"suffix": ".min"}))//重命名  main.min.js
        .pipe(gulp.dest('./public-v/js'));
});

//检查js
gulp.task('jshint', function () {
    gulp.src(['./public/js/**'])
        .pipe(jshint()) //代码检测
        .pipe(jshint.reporter('default'));//代码报错提示
});

//清除dist文件夹内容
gulp.task('clean', function () {
    return gulp.src(['./www-dist/*'])
        .pipe(clean());
});

//替换文件的版本号
gulp.task('change-html-ver', function () {
    gulp.src(['./public/index.html'], {base: './public'})
        .pipe(replace(/_v=[0-9]{1,}/g, "_v=" + new Date().getTime()))
        .pipe(gulp.dest('./public-v/'));
});
gulp.task('change-js-ver', function () {
    gulp.src(['./www/usercenter/js/*.js'], {base: './www'})
        .pipe(replace(/_v=[0-9]{1,}/g, '_v=' + new Date().getTime()))
        .pipe(gulp.dest('./public-v/'));
});

//复制外部包文件
gulp.task('copy-package', function () {
    gulp.src(['./public/components/**'], {base: './www'})
        .pipe(gulp.dest('./public-v'));
});

//复制html
gulp.task('copy-html', ['cver'], function () {
    var src = ['./www/index.html',
        './www/pages/**',
        './www/usercenter/index.html',
        './www/usercenter/views/**'];
    var target = './www-dist';
    gulp.src(src, {base: './www'})
        .pipe(gulp.dest('./www-dist'));
});

//复制image
gulp.task('copy-img', function () {
    gulp.src('./www/img/**', {base: './www'})
        .pipe(gulp.dest('./www-dist'));
});

//处理css
gulp.task('css', ['min-concat-rename-css']);

//处理js
gulp.task('js', ['min-uglify-rename-js']);

//更改版本号
gulp.task('cver', ['change-html-ver', 'change-js-ver']);

gulp.task('w-cver', function () {
    gulp.watch(['./www/*.*', './www/tpls/*.*'], function () {
        gulp.start('cver');
    });
});

//全部处理//编译版本
gulp.task('build', ['clean'], function () {
    gulp.start('copy-package', 'copy-html', 'copy-img', 'js', 'css');
});

gulp.task('default', ['build']);
