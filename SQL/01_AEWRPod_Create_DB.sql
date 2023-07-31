USE [master]

IF db_id('AEWRPod') IS NULL
	CREATE DATABASE [AEWRPod]
GO

USE [AEWRPod]
GO

DROP TABLE IF EXISTS [Post];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [ClipComment];
DROP TABLE IF EXISTS [Clip];
DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [PostComment];
DROP TABLE IF EXISTS [FullEpisode];
DROP TABLE IF EXISTS [FullEpisodeComment];
GO

CREATE TABLE [Post] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Title] nvarchar(255) NOT NULL,
	[Body] text NOT NULL,
	[CreateDateTime] datetime NOT NULL,
	[UserProfileId] integer NOT NULL,
)

CREATE TABLE [Category] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Name] nvarchar(50) NOT NULL,
)

CREATE TABLE [ClipComment] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Body] nvarchar(1000) NOT NULL,
	[CreateDateTime] integer NOT NULL,
	[UserProfileId] integer NOT NULL,
	[ClipId] integer NOT NULL,

	CONSTRAINT [FK_ClipComment_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
	CONSTRAINT [FK_ClipComment_Clip] FOREIGN KEY ([ClipId]) REFERENCES [Clip] ([Id]),
)

CREATE TABLE [Clip] (
	[Id] integer PRIMARY KEY IDENTITY,
	[ClipUrl] nvarchar(1000) NOT NULL,
	[CreateDateTime] datetime NOT NULL,
	[CategoryId] integer NOT NULL,

	CONSTRAINT [FK_Clip_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
)



CREATE TABLE [UserProfile] (
	[Id] integer PRIMARY KEY IDENTITY,
	[DisplayName] nvarchar(50) NOT NULL,
	[FirstName] nvarchar(50) NOT NULL,
	[LastName] nvarchar(50) NOT NULL,
	[Email] nvarchar(50) NOT NULL,
	[CreateDateTime] datetime NOT NULL,
	[UserTypeId] integer NOT NULL,
  
  CONSTRAINT [FK_User_UserType] FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id]),
)

CREATE TABLE [UserType] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Name] nvarchar(50) NOT NULL,
)



CREATE TABLE [PostComment] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Body] nvarchar(1000) NOT NULL,
	[CreateDateTime] integer NOT NULL,
	[UserProfileId] integer NOT NULL,
	[PostId] integer NOT NULL,

	CONSTRAINT [FK_PostComment_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
	CONSTRAINT [FK_PostComment_Post] FOREIGN KEY ([PostId]) REFERENCES [Post] ([Id]),
)

CREATE TABLE [FullEpisode] (
	[Id] integer PRIMARY KEY IDENTITY,
	[EpisodeUrl] nvarchar(1000) NOT NULL,
	[CreateDateTime] datetime NOT NULL,
	[CategoryId] integer NOT NULL,

	CONSTRAINT [FK_FullEpisode_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]),
)

CREATE TABLE [FullEpisodeComment] (
	[Id] integer PRIMARY KEY IDENTITY,
	[Body] nvarchar(1000) NOT NULL,
	[CreateDateTime] integer NOT NULL,
	[UserProfileId] integer NOT NULL,
	[FullEpisodeId] integer NOT NULL,

	CONSTRAINT [FK_FullEpisodeComment_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),
)

GO