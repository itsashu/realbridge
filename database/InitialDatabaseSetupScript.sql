------------------------------Database setup initial script---------------------------
IF DB_ID('RealBridgeDB') IS NULL
	BEGIN
		PRINT 'Creating RealBridgeDB Database';
		CREATE Database RealBridgeDB;
		PRINT 'RealBridgeDB created';
	END
ELSE 
	BEGIN
		PRINT 'RealBridgeDB already exist';
	END

GO

USE RealBridgeDB
PRINT 'Using RealBridgeDB';

GO

IF OBJECT_ID (N'Images', N'U') IS NULL 
	BEGIN
		PRINT 'creating new table: Images';
		CREATE TABLE Images (
			Id int identity primary key,
			Title nvarchar(40),
			Description nvarchar(100) null,
			Image varbinary(max) null,
		);
		PRINT 'Created new table: Images';
	END
ELSE
	BEGIN
		PRINT 'Images table already exists';	
	END

GO

PRINT 'Adding Dummy Data to Images Table';

INSERT INTO Images VALUES ('1st dummy image', 'dummy image title', null);

select * from Images