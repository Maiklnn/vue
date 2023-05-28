const gulp = require('gulp')
const fs = require('fs') // плагин node который работает с файловой системой


const browsersync = require('browser-sync').create()
const rename = require('gulp-rename')
const del = require('del')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const size = require('gulp-size')
const newer = require('gulp-newer')
const fileinclude = require('gulp-file-include')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const replace = require('gulp-replace');

// html
const gulppug = require('gulp-pug')
// css
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const gcmq = require('gulp-group-css-media-queries')
const sassGlob = require('gulp-sass-glob') // для подключения шаблонов из папок (pages/**/**)

// js
const babel = require('gulp-babel')
// img
const imagemin = require('gulp-imagemin')

// настройки
const settings = {
	isPug:  true,
	theme: 'dist/',

	/* course-minin
		src: 'vue-src/course-minin/lesson1/counter',
		src: 'vue-src/course-minin/lesson1/app',
		src: 'vue-src/course-minin/lesson2/app',
	*/
	src: 'vue-src/course-minin/lesson3/app',

}

// Пути
const paths = {
	browsersync: {
		proxy: '', // локальный сервер
		baseDir: './dist', // директория
	},

	pug: {
		src: [`${settings.src}/**/*.pug`, `!${settings.src}/**/_*/**/*`], // pug для компиляции
		watch: [`${settings.src}/**/*.pug`], // pug слежки
		dest: `${settings.theme}`, //  разместить готовые
	},

	styles: {
		src: [`${settings.src}/**/*.scss`, `!${settings.src}/**/_*/**/*`], // scss компиляции
		watch: [`${settings.src}/**/*.scss`], // scss слежки
		dest: `${settings.theme}`, // разместить готовые фаилы
	},
	scripts: {
		src: `${settings.src}/**/*.js`,
		dest: `${settings.theme}`,
	},
	fonts: {
		src: `${settings.src}/assets/fonts/*`,
		dest: `${settings.theme}/assets/fonts/`
	},
	images: {
		src: `${settings.src}/**/*.+(png|jpg)`,
		dest: `${settings.theme}`
	},
	php: {
		src: [`${settings.src}/**/*.php`, `${settings.src}/**/*.html`, `!${settings.src}/_*/**/*`],
		watch: [`${settings.src}/**/**/*.html`],
		dest: `${settings.theme}`
	},
	files: {
		src: [`${settings.src}/assets/files/**/*`],
		dest: `${settings.theme}/assets/files/`
	},
	ftp: {
		host: 'web-nn.ru', // Адрес FTP сервера
		user: "webnn", // Имя пользователя
		password: "PfOTloZucB", // Пароль
		app: ["./dist/**/*.*", "!./dist/**/_*.*"], // Папка на локалке ( если файл начинаеться с _ то он не отправляеться )
		remote_server: "/web/test", // Папка на удалённом сервере
	}
}

// Обработка pug
function pug() {
	return gulp.src(paths.pug.src)
	.pipe(plumber(
		notify.onError({
			title: "PUG",
			message: "Error: <%= error.message %>"
		}))
	)
	.pipe(sassGlob())
	.pipe(gulppug({pretty: true}))

	.pipe(replace(/&lt;/g, '<'))
	.pipe(replace(/&gt;/g, '/>'))
	// .pipe(rename({ extname: '.php' 	}))
	.pipe(size({ showFiles:true 	}))
	.pipe(gulp.dest(paths.pug.dest))
	.pipe(browsersync.stream())
}

// Обработка стилей
function styles() {
	return gulp.src(paths.styles.src)
	.pipe(plumber(
		notify.onError({
			title: "SCSS",
			message: "Error: <%= error.message %>"
		})))
	.pipe(sassGlob())
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer({
		cascade: false
	}))
	.pipe(gcmq())
	.pipe(replace(/\/gulp-pack\/src\/assets\/images\//g, '/img/'))

	.pipe(sourcemaps.write('.'))
	.pipe(size({
		showFiles:true
	}))
	.pipe(gulp.dest(paths.styles.dest))
	.pipe(browsersync.stream())

}

// Обработка Java Script, Type Script и Coffee Script
function scripts() {
	return gulp.src(`${paths.scripts.src}`)
	.pipe(plumber(
		notify.onError({
			title: "JS",
			message: "Error: <%= error.message %>"
		}))
	)
	.pipe(sourcemaps.init())
	.pipe(fileinclude())
	.pipe(babel({
		presets: ['@babel/env']
	}))

	.pipe(sourcemaps.write('.'))
	.pipe(size({
		showFiles:true
	}))
	.pipe(gulp.dest(paths.scripts.dest))
	.pipe(browsersync.stream())
}

// Обработка шрифтов
function fontsStyle() {
	return gulp.src(paths.fonts.src)
	.pipe(gulp.dest(paths.fonts.dest))
}

// Сжатие изображений
function img() {
	return gulp.src(paths.images.src)
	.pipe(newer(paths.images.dest))
	.pipe(imagemin({
		progressive: true
	}))
	.pipe(size({
		showFiles:false
	}))
	.pipe(gulp.dest(paths.images.dest))
}

// доп файлы
function files() {
	return gulp.src(paths.files.src)
	.pipe(gulp.dest(paths.files.dest))
}

// php
function php() {
	return gulp.src(paths.php.src)
	.pipe(gulp.dest(paths.php.dest))
	.pipe(browsersync.stream())
}

// deploy
const deploy = () => {
	let configFTP = {
		host: paths.ftp.host, // Адрес FTP сервера
		user: paths.ftp.user, // Имя пользователя
		password: paths.ftp.password, // Пароль
		parallel: 5, // Кол-во одновременных потоков
		log: util.log // логи
	}

	const ftpConnect = vinylFTP.create(configFTP);
	return gulp.src(paths.ftp.app, {})
	.pipe(plumber(
		notify.onError({
			title: "FTP",
			message: "Error: <%= error.message %>"
		}))
	)
	.pipe(ftpConnect.dest(paths.ftp.remote_server))
	.pipe(browsersync.stream());
}

// Задача слежки за файлами
function watch() {
	// browsersync
	if(paths.browsersync.baseDir) var server =  {server: { baseDir: paths.browsersync.baseDir}}
	browsersync.init(
		// ----------------------------------------------- удалённый сервер
		// proxy: "http://web-nn.ru/", // проксирование вашего удаленного сервера, не важно на чем back-end
		// host:      'web-nn.ru', // можно использовать ip сервера
		// port:      3000, // порт через который будет проксироваться сервер
		// open: false, // указываем, что наш url внешний

		// ----------------------------------------------- директория на локалке

		server

		// ----------------------------------------------- локальный сервер
		// proxy: `https://${paths.browsersync.proxy}/`,

	);


	if(settings.isPug) gulp.watch(paths.pug.watch, pug)
	gulp.watch(paths.styles.watch, styles)
	gulp.watch(paths.php.watch, php)
	gulp.watch(paths.php.watch, pug)

	gulp.watch(paths.scripts.src, scripts)
	gulp.watch(paths.images.src, img)
	gulp.watch(paths.files.src, files)

	// gulp.watch(paths.ftp.app, deploy)
}

// del
function clean() {
	return del(settings.theme, { force: true })
}

function empty() {
	return gulp.src(paths.files.src)
}

// Таск, который выполняется по команде gulp
const build = gulp.series(clean, pug, gulp.parallel(styles, scripts,fontsStyle,img,php,files), watch)


// Таски для ручного запуска с помощью gulp clean, gulp html и т.д.
exports.clean = clean
exports.pug = pug
exports.styles = styles
exports.scripts = scripts
exports.fontsStyle = fontsStyle
exports.img = img
exports.watch = watch
exports.build = build
exports.default = build
