USE [AEWRPod];
GO

set identity_insert [UserType] on
insert into [UserType] ([Id], [Name]) VALUES (1, 'Admin'), (2, 'User');
set identity_insert [UserType] off

set identity_insert [Category] on
insert into [Category] ([Id], [Name])
values (1, 'WWE'), (2, 'WCW')
set identity_insert [Category] off

set identity_insert [UserProfile] on
insert into UserProfile ([Id], [DisplayName], [FirstName], [LastName], [Email], [CreateDateTime], [UserTypeId]) values (1, 'Drewski', 'Drew', 'Caldwell', 'aewr316@email.com', '2023-07-27', 1);
insert into UserProfile ([Id], [DisplayName], [FirstName], [LastName], [Email], [CreateDateTime], [UserTypeId]) values (2, 'VelvetVoice', 'Arnold', 'Rispress', 'velvet@email.com', '2023-07-27', 1);
insert into UserProfile ([Id], [DisplayName], [FirstName], [LastName], [Email], [CreateDateTime], [UserTypeId]) values (3, 'TheRock', 'Dwayne', 'Johnson', 'rock@email.com', '2023-07-27', 2);
insert into UserProfile ([Id], [DisplayName], [FirstName], [LastName], [Email], [CreateDateTime], [UserTypeId]) values (4, 'StoneCold', 'Steve', 'Austin', 'austin@email.com, ', '2023-07-27', 2);
set identity_insert [UserProfile] off

set identity_insert [Post] on
insert into [Post] ([Id], [Title], [Body], [CreateDateTime], [UserProfileId]) values (1, 'Do you smell what the rock is cookin?', 'Spaghetti. Always spaghetti!', '2023-07-27', 3);
insert into [Post] ([Id], [Title], [Body], [CreateDateTime], [UserProfileId]) values (2, 'Stone Cold Stunner', 'I''m gonna give you a Stone Cold Stunner!', '2023-07-27', 4);
insert into [Post] ([Id], [Title], [Body], [CreateDateTime], [UserProfileId]) values (3, 'WWE', 'WWE is the best! Don''t listen to Arnold!', '2023-07-27', 1);
insert into [Post] ([Id], [Title], [Body], [CreateDateTime], [UserProfileId]) values (4, 'WCW', 'WCW is the best! Drew is wrong!', '2023-07-27', 2);
set identity_insert [Post] off

set identity_insert [Clip] on
insert into [Clip] ([Id], [ClipUrl], [CreateDateTime], [CategoryId]) values (1, 'https://www.tiktok.com/@aewrpod316/video/7258259865804573995?is_from_webapp=1&sender_device=pc&web_id=7208298379200284203', '2023-07-27', 1);
insert into [Clip] ([Id], [ClipUrl], [CreateDateTime], [CategoryId]) values (2, 'https://www.tiktok.com/@aewrpod316/video/7257480032027692330?is_from_webapp=1&sender_device=pc&web_id=7208298379200284203', '2023-07-27', 2);
insert into [Clip] ([Id], [ClipUrl], [CreateDateTime], [CategoryId]) values (3, 'https://www.tiktok.com/@aewrpod316/video/7254921386815278378?is_from_webapp=1&sender_device=pc&web_id=7208298379200284203', '2023-07-27', 1);
insert into [Clip] ([Id], [ClipUrl], [CreateDateTime], [CategoryId]) values (4, 'https://www.tiktok.com/@aewrpod316/video/7254547206693326123?is_from_webapp=1&sender_device=pc&web_id=7208298379200284203', '2023-07-27', 2);
set identity_insert [Clip] off

set identity_insert [PostComment] on
insert into [PostComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [PostId]) values (1, 'I love spaghetti!', '2023-07-27', 1, 1);
insert into [PostComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [PostId]) values (2, 'I love spaghetti too!', '2023-07-27', 2, 1);
insert into [PostComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [PostId]) values (3, 'I love spaghetti more!', '2023-07-27', 3, 1);
insert into [PostComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [PostId]) values (4, 'I love spaghetti the most!', '2023-07-27', 4, 1);
insert into [PostComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [PostId]) values (5, 'Please don''t hurt me!', '2023-07-27', 1, 2);
insert into [PostComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [PostId]) values (6, 'You''re wrong!!', '2023-07-27', 2, 3);
insert into [PostComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [PostId]) values (7, 'No, you''re wrong!', '2023-07-27', 3, 4);
insert into [PostComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [PostId]) values (8, 'No, you''re wrong!', '2023-07-27', 4, 3);
set identity_insert [PostComment] off

set identity_insert [ClipComment] on
insert into [ClipComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [ClipId]) values (1, 'I love spaghetti!', '2023-07-27', 1, 1);
insert into [ClipComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [ClipId]) values (2, 'I love spaghetti too!', '2023-07-27', 2, 1);
insert into [ClipComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [ClipId]) values (3, 'I love spaghetti more!', '2023-07-27', 3, 2);
insert into [ClipComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [ClipId]) values (4, 'I love spaghetti the most!', '2023-07-27', 4, 2);
insert into [ClipComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [ClipId]) values (5, 'Please don''t hurt me!', '2023-07-27', 1, 3);
insert into [ClipComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [ClipId]) values (6, 'You''re wrong!!', '2023-07-27', 2, 3);
insert into [ClipComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [ClipId]) values (7, 'No, you''re wrong!', '2023-07-27', 3, 4);
insert into [ClipComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [ClipId]) values (8, 'This was such an amazing match!', '2023-07-27', 4, 4);
set identity_insert [ClipComment] off

set identity_insert [FullEpisode] on
insert into [FullEpisode] ([Id], [EpisodeUrl], [CreateDateTime], [CategoryId]) values (1, 'https://open.spotify.com/episode/4YercTfnghn7kieWcy6CoM?si=8f38036170934a6f', '2023-07-27', 1);
insert into [FullEpisode] ([Id], [EpisodeUrl], [CreateDateTime], [CategoryId]) values (2, 'https://open.spotify.com/episode/6rw9iPFm6PmhO8BQtRJ44y?si=686ca98ea9a24b9a', '2023-07-27', 2);
insert into [FullEpisode] ([Id], [EpisodeUrl], [CreateDateTime], [CategoryId]) values (3, 'https://open.spotify.com/episode/0vaGSUyRalNQyIpML2KNS3?si=dd12b45eb52d4dd8', '2023-07-27', 1);
insert into [FullEpisode] ([Id], [EpisodeUrl], [CreateDateTime], [CategoryId]) values (4, 'https://open.spotify.com/episode/27COSqQlMXbe8eK1yBFMxL?si=25249593df984da3', '2023-07-27', 2);
set identity_insert [FullEpisode] off

set identity_insert [FullEpisodeComment] on
insert into [FullEpisodeComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [FullEpisodeId]) values (1, 'I love spaghetti!', '2023-07-27', 1, 1);
insert into [FullEpisodeComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [FullEpisodeId]) values (2, 'I love spaghetti too!', '2023-07-27', 2, 1);
insert into [FullEpisodeComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [FullEpisodeId]) values (3, 'I love spaghetti more!', '2023-07-27', 3, 2);
insert into [FullEpisodeComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [FullEpisodeId]) values (4, 'I love spaghetti the most!', '2023-07-27', 4, 2);
insert into [FullEpisodeComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [FullEpisodeId]) values (5, 'Please don''t hurt me!', '2023-07-27', 1, 3);
insert into [FullEpisodeComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [FullEpisodeId]) values (6, 'You''re wrong!!', '2023-07-27', 2, 3);
insert into [FullEpisodeComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [FullEpisodeId]) values (7, 'No, you''re wrong!', '2023-07-27', 3, 4);
insert into [FullEpisodeComment] ([Id], [Body], [CreateDateTime], [UserProfileId], [FullEpisodeId]) values (8, 'This was such an amazing match!', '2023-07-27', 4, 4);
set identity_insert [FullEpisodeComment] off