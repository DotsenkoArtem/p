const gulp          = require('gulp');
const debug         = require('gulp-debug');
const del           = require('del');
const imagemin      = require('gulp-imagemin');

const imageminPngquant  = require('imagemin-pngquant');
const imageminMozjpeg   = require('imagemin-mozjpeg');
const webp              = require('gulp-webp');




const uglify        = require('gulp-uglify');
const through2      = require('through2').obj;
const pug           = require('gulp-pug');
const sass          = require('gulp-sass')(require('sass'));
const autoprefixer  = require('gulp-autoprefixer');
const cleanCSS      = require('gulp-clean-css');
const babel         = require("gulp-babel");
const gulpIf        = require('gulp-if');
const sourcemaps    = require('gulp-sourcemaps')
const notify        = require('gulp-notify');
const combiner      = require('stream-combiner2').obj;
const svgSprite     = require('gulp-svg-sprite');
const browserSync = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

// ПРОСТО КОПИРОВАНИЕ ШРИФТОВ В ПАПКУ  СОХРАНЕНИЕМ СТРУКТУРЫ
gulp.task('fonts', function() {
    return  gulp.src('src/assets/**/*.{ttf,woff,woff2}', {since: gulp.lastRun('fonts')})
            .pipe(gulp.dest('public'));
});

// ПРОСТО КОПИРОВАНИЕ PHP В КОРЕНЬ
gulp.task('php', function() {
    return  gulp.src('src/php/**/*.*', {since: gulp.lastRun('php')})
            .pipe(gulp.dest('public'));
});

// ПРОСТО КОПИРОВАНИЕ libs В КОРЕНЬ
gulp.task('libs', function() {
    return  gulp.src('src/assets/libs/**/*.*', {since: gulp.lastRun('libs')})
            .pipe(gulp.dest('public'));
});


// ПРОСТО КОПИРОВАНИЕ ИКОНОК:SVG В ПАПКУ  СОХРАНЕНИЕМ СТРУКТУРЫ
gulp.task('sprite:svg', function() {
    return  gulp.src('src/assets/img/icons/**/*.svg')
            .pipe(gulpIf(
                
                function(file) {
                    return file;
                },
                
                svgSprite({
                    mode: {
                        css: {
                            dest:       '.',
                            bust:       false,          //хеши в файле sprite.svg
                            sprite:     'sprite.svg',   //имя файла from relative to dest
                            layout:     'vertical',
                            // prefix:     '%',
                            //dimensions: true,           //размеры картинки в одно классе с бэкграундом
                            render:     {
                                scss: {
                                    dest: 'sprite.scss'
                                }
                                // css: true
                            }
                        }
                    }
                })
            ))
            .pipe(gulpIf('*.scss', 
                    gulp.dest('tmp/scss'),
                    gulp.dest('public/css'))
                );
});

// КОНВЕРТИРОВАНИЕ PNG --> WEBP
gulp.task('webp', function() {
    return  gulp.src(
                    'src/assets/img/**/*.png',
                    '!src/assets/img/icons/',
                    '!src/assets/img/favicons/'
                )
            .pipe(webp(
                {
                    // preset: 'photo',
                    quality: 85,
            }
            ))
            .pipe(gulp.dest('public/img')); 
});



// КОПИРОВАНИЕ ИЗОБРАЖЕНИЙ (только дочерние файлы - без папок) и МИНИФИКАЦИЯ
gulp.task('imgmin', function() {
    return  gulp.src([
            'src/assets/img/**/*.*',
            '!src/assets/img/icons/**/*.svg'
            ], {since: gulp.lastRun('img')})
            .pipe(gulpIf(
                function(file) {
                    return file.extname !== '.svg';
                },
                imagemin([
                    imageminPngquant(),
                    imageminMozjpeg({quality: 70, progressive: true}),
                ])
            ))
            .pipe(gulp.dest('public/img'));
});

// ИЗОБРАЖЕНИЯ: КОНВЕРТИРОВАНИЕ, МИНИИКАЦИЯ, КОПИРОВАНИЕ
gulp.task('img', gulp.series('imgmin', 'webp'));


// ОБЩАЯ ЗАДАЧА ДЛЯ СОДЕРЖИМОГО "ASSETS" (FONTS, IMG, ICONS)
gulp.task('assets', gulp.parallel('fonts', 'sprite:svg', 'img'));

// JS
gulp.task('js', function() {
    return  combiner(
                gulp.src('src/js/**/*.js'),
                // Переименование и дублирование файла
                through2(
                    function(file, enc, callback) {
                        let fileMin = file.clone();
                        fileMin.stem += '.min';
                        this.push(fileMin);
                        callback(null, file);
                    }
                ),
                babel({
                    presets: ["@babel/preset-env"]
                  }),
                gulpIf(
                    function(file) {
                        return file.stem.includes('.min');
                    },
                    uglify()
                ),
                gulp.dest('public/js')
    ).on('error', notify.onError(function(err) {
                return {
                    title: 'Error: Java Script',
                    message: err.message,
                }
    }));
});

// STYLES
gulp.task('styles', function() {
    return  combiner(
                gulp.src('src/styles/scss/layout.scss'),
                gulpIf(isDevelopment, sourcemaps.init()),
                sass(),
                autoprefixer({
                    cascade: false
                }),
                // Переименование файла
                through2(
                    function(file, enc, callback) {
                        file.stem = 'style';
                        let fileMin = file.clone();
                        fileMin.stem += '.min';
                        this.push(fileMin);
                        callback(null, file);
                    }
                ),
                gulpIf(isDevelopment, sourcemaps.write('.')),
                gulpIf(
                    function(file) {
                        return file.stem.includes('.min');
                    },
                    cleanCSS({compatibility: 'ie8'})
                ),
                gulp.dest('public/css')
    ).on('error', notify.onError(function(err) {
                return {
                    title: 'Error: Styles',
                    message: err.message,
                }
    }));
});

// PUG
gulp.task('pug', function() {
    return  combiner(
                gulp.src('src/pug/*.*'),
                gulpIf(function(file) {
                    return file.extname == '.pug';
                }, pug({pretty: true})),
                gulp.dest('public')
            ).on('error', notify.onError(function(err) {
                return {
                    title: 'Error: pug',
                    message: err.message,
                }
            }));
     
});

// НАБЛЮДЕНИЕ
gulp.task('watch', function() {
    gulp.watch('src/assets/fonts/', gulp.series('fonts'));
    gulp.watch('src/assets/img/icons/**/*.svg', gulp.series('sprite:svg'));
    gulp.watch(['src/assets/img/**/*.*', '!src/assets/img/icons/**/*.svg'], gulp.series('img'));
    gulp.watch('src/js/**/*.*', gulp.series('js'));
    gulp.watch('src/styles/**/*.scss', gulp.series('styles'));
    gulp.watch('src/pug/**/*.*', gulp.series('pug'));
    gulp.watch('src/php/**/*.*', gulp.series('php'));
    gulp.watch('src/assets/libs/**/*.*', gulp.series('libs'));
});

gulp.task('serve', ()=> {
    browserSync.init({
        server: "public",
    });
    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

// УДАЛЕНИЕ ПАПКИ PUBLIC
gulp.task('clean', function() {
    return del('public');
});

// ПОСТРОЕНИЕ
gulp.task('build', gulp.series('clean', gulp.series('assets', 'js', 'styles', 'pug', 'php', 'libs')));

// РАЗРАБОТКА
gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'serve')));