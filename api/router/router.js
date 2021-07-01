import express from 'express';
import index from './index';
import db from './db';
import upload from './upload';

export default function(app){
	app.use('/', index);
	app.use('/db', db);
	app.use('/upload', upload);
}