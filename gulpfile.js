/**
 * Created by jun on 2017/9/14.
 */
var gulp = require('gulp'); //装好gulp之后  声明gulp
var less = require('gulp-less');  //less插件
var connect = require('gulp-connect');  //服务器配置   下方是server
var uglify = require('gulp-uglify');    //js程序压缩
var minifyCss = require("gulp-minify-css") ; //css文件压缩
var img = require("gulp-imagemin") ;  //图片压缩
var pngquant = require('imagemin-pngquant'); //图片深度压缩



//服务器端口启动
gulp.task('server',function(){
    connect.server({
        root:'dist',
        port:8090,
        livereload:true
    });
});


//html
gulp.task('html',function(){
    return gulp.src(['sp/*/*.html']).pipe(gulp.dest('dist/sp/')).pipe(connect.reload());

});

gulp.task('html_pub',function(){
    return gulp.src(['*.html']).pipe(gulp.dest('dist')).pipe(connect.reload());
});

gulp.task('img',function(){
    return gulp.src('sp/*/img/*.{jpg,png,gif}').pipe(img({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use:[pngquant()]
    })).pipe(gulp.dest('dist/sp'))
})
gulp.task('img_pub',function(){
    return gulp.src(['img/*.{jpg,png,gif}','images/*/*.{jpg,png,gif}']).pipe(img({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use:[pngquant()]
    })).pipe(gulp.dest('dist/img'))
})


gulp.task('script',function(){
    return gulp .src('sp/*/*.js').pipe(gulp.dest('dist/sp')).pipe(connect.reload());
});
gulp.task('script_pub',function(){
    return gulp .src('js/*.js').pipe(gulp.dest('dist/js')).pipe(connect.reload())
});


gulp.task('less',function(){
    return gulp.src('sp/*/*.less').pipe(less()).pipe(minifyCss()).pipe(gulp.dest('dist/sp')).pipe(connect.reload());
});

gulp.task('less_pub',function(){
    return gulp.src(['css/*.less']).pipe(less()).pipe(minifyCss()).pipe(gulp.dest('dist/css')).pipe(connect.reload());
});

gulp.task('font',function(){
    return gulp.src(['font/*.ttf','font/*.eot','font/*.woff']).pipe(gulp.dest('dist/font'))
});



gulp.task('watch',function(){
    gulp.watch(['*.html','sp/*/*.html'],['html_pub','html']);

    gulp.watch(['css/*.less','sp/*/*.less','css/*.css'],['less_pub','less']);

    gulp.watch(['img/*.{jpg,png,gif}','sp/*/img/*.{jpg,png,gif}'],['img_pub','img']);

    gulp.watch(['js/*.js','sp/*/*.js'],['script_pub','script'])
});

gulp.task('build',['script','script_pub','html','html_pub','img','img_pub','less','less_pub','font'])

gulp.task('default',['server','watch']);















