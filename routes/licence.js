// Requirements
var express = require('express');
var licenseKey = require('license-key-gen');

// Inicializacion e Instancias
var app = express();
var CODPROD = require('../config/config').CODPROD;
var VERSIONAPP = require('../config/config').VERSIONAPP;

// Funcion para generar la Licencia de la empresa
app.get('/', (req, res, next) => {
    
    // Obtengo los valores de la peticion recibida
    body = req.body;

    // Creo Objeto con los datos de la empresa para la Generacion de la Licencia
    var empresaInfo = {
        empresa: body.empresa,
        direccion: body.direccion,
        ciudad: body.ciudad,
        estado: body.estado,
        codigopostal: body.codigopostal,
        rfc: body.rfc
    }

    // Creo Objeto con los datos de la Informacion Empresa, Codigo o Semilla, Version de la Aplicacion y Sistema Operativo
    var datosLicencia = {
        info: empresaInfo, prodCode: CODPROD, appVersion: VERSIONAPP, osType:"IOS8"
    }

    // Genero la Licencia
    try{
        var license = licenseKey.createLicense(datosLicencia)
        res.status(200).json({
            exitoso: true,
            mensaje: 'Licencia Generada Correctamente',
            info: license
        });
    }catch(err){
        res.status(500).json({
            exitoso: false,
            mensaje: 'Error al Generar la Licencia intentar nuevamente',
            error: err            
        });
    }

});


// Validar Licencia Empresa
app.get('/:licencia', (req, res) => {
    
    var numeroLicencia = req.params.licencia;

    // Por el momento los datos se estan siendo obtendidos de la peticion  pero estos no deben de ser necesario hay que tomarlos de la 
    // base de datos pasando como parametro el id de empresa 

    body = req.body;

    var empresaInfo = {
        empresa: body.empresa,
        direccion: body.direccion,
        ciudad: body.ciudad,
        estado: body.estado,
        codigopostal: body.codigopostal,
        rfc: body.rfc
    }

    var datosLicencia = {
        info: empresaInfo, prodCode: CODPROD, appVersion: VERSIONAPP, osType:"IOS8"
    }    

    try{
        var license = licenseKey.validateLicense(datosLicencia, numeroLicencia);
        res.status(200).json({
            exitoso: true,
            mensaje: 'Licencia Validada Exitosamente',
            info: license
        });
    }catch(err){
        res.status(500).json({
            exitoso: false,
            mensaje: 'Error la licencia ingresada no es valida',
            error: err       
        });
    }


});

module.exports = app