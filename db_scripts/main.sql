DROP DATABASE IF EXISTS sinapsis_technical_test;
CREATE DATABASE IF NOT EXISTS sinapsis_technical_test;

USE sinapsis_technical_test;

#Create table `cliente` and insert data.
DROP TABLE IF EXISTS cliente;
CREATE TABLE IF NOT EXISTS cliente(
    idCliente INT,
    nombre VARCHAR(100),
    estado TINYINT(1),
    PRIMARY KEY (idCliente)    
);

INSERT INTO cliente(idCliente, nombre, estado)
VALUES
  (494554112, 'Juan Pérez', 1),
  (494554113, 'Carlos Rodríguez', 1),
  (494554114, 'Pedro Sánchez', 1),
  (494554115, 'Laura López', 0),
  (494554116, 'Diego Ramírez', 1),
  (494554117, 'Sofía Fernández', 0),
  (494554118, 'Valentina Díaz', 0);
 
 
#Create table `usuario` and insert data.
DROP TABLE IF EXISTS usuario;
CREATE TABLE IF NOT EXISTS usuario(
    idUsuario INT,
    idCliente INT,
    usuario VARCHAR(30),
    estado TINYINT(1),
    PRIMARY KEY (idUsuario),
    CONSTRAINT fk_usuario_1 FOREIGN KEY (idCliente) REFERENCES cliente(idCliente)
);

INSERT INTO usuario(idUsuario, idCliente, usuario, estado)
SELECT
	idCliente + 111111,
	idCliente,
	LOWER(CONCAT('usr_', SUBSTR(nombre, 1, 1), SUBSTRING_INDEX(nombre, ' ', -1))),
	estado 
FROM cliente;


DROP TABLE IF EXISTS campania;
CREATE TABLE IF NOT EXISTS campania(
    idCampania INT,
    idUsuario INT,
    nombre VARCHAR(200),
    fechaHoraProgramacion DATETIME,
    estado TINYINT(1),
    PRIMARY KEY (idCampania),
    CONSTRAINT fk_campania_1 FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

DROP TABLE IF EXISTS mensaje;
CREATE TABLE IF NOT EXISTS mensaje(
    idMensaje INT,
    idCampania INT,
    estadoEnvio TINYINT(1),
    fechaHoraEnvio DATETIME,
    mensaje VARCHAR(160),
    estado TINYINT(1),
    PRIMARY KEY (idMensaje),
    CONSTRAINT fk_mensaje_1 FOREIGN KEY (idCampania) REFERENCES campania(idCampania)
);


DELIMITER //
CREATE PROCEDURE `sinapsis_technical_test`.`crearCampania`(
	IN pIdUsuario INT,
	IN pNombreCampania VARCHAR(200),
	IN pFechaHoraProgramacion DATETIME,
	IN pEstado TINYINT(1))
BEGIN

	DECLARE vIdCamapania INT;

	SET vIdCamapania = (MOD(UUID_SHORT(), 1000000000));
	
	INSERT INTO
		campania(idCampania, idUsuario, nombre, fechaHoraProgramacion, estado)
	VALUES
		(vIdCamapania, pIdUsuario, pNombreCampania, pFechaHoraProgramacion, pEstado);
	

	SELECT
		vIdCamapania AS idCampania;
		
END//
DELIMITER ;


DELIMITER //
CREATE DEFINER=`root`@`%` PROCEDURE `sinapsis_technical_test`.`crearMensaje`(
	IN pIdCampania INT,
	IN pFechaHoraEnvio DATETIME,
	IN pMensaje VARCHAR(160),
	IN pEstado TINYINT(1))
BEGIN

	DECLARE vIdMensaje INT;

	SET vIdMensaje = (MOD(UUID_SHORT(), 1000000000));
	
	INSERT INTO
		mensaje(idMensaje, idCampania, estadoEnvio, fechaHoraEnvio, mensaje, estado)
	VALUES
		(vIdMensaje, pIdCampania, 1, pFechaHoraEnvio, pMensaje, pEstado);
		
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE `sinapsis_technical_test`.`buscarMensajes`(
	IN pMes CHAR(2),
	IN pIdCliente INT
)
BEGIN

	SELECT
		t1.estadoEnvio,
		t1.fechaHoraEnvio,
		t1.mensaje
	FROM mensaje t1
	INNER JOIN campania t2 ON t2.idCampania = t1.idCampania
	INNER JOIN usuario t3 ON t3.idUsuario = t2.idUsuario
	WHERE t1.estado = 1
	AND IF(pIdCliente IS NOT NULL, t3.idCliente = pIdCliente, 1)
	AND IF(pMes IS NOT NULL, MONTH(t1.fechaHoraEnvio) = pMes, 1);
		
END//
DELIMITER ;
