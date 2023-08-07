using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using AEWRPod2.Models;
using AEWRPod2.Utils;
using System.Security.Cryptography;

namespace AEWRPod2.Repositories
{
    public class PostCommentRepository : BaseRepository, IPostCommentRepository
    {
        public PostCommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<PostComment> GetPostCommentsByPostId(int postId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT pc.Id, pc.Body, pc.CreateDateTime, pc.UserProfileId, pc.PostId,
                               up.DisplayName AS UserProfileDisplayName,
                               up.CreateDateTime AS UserProfileCreateDateTime
                          FROM PostComment pc
                               LEFT JOIN UserProfile up ON pc.UserProfileId = up.Id
                               LEFT JOIN Post p ON pc.PostId = p.Id
                         WHERE pc.PostId = @postId
                      ORDER BY pc.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@postId", postId);

                    var reader = cmd.ExecuteReader();

                    var postComments = new List<PostComment>();

                    while (reader.Read())
                    {
                        postComments.Add(new PostComment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Body = DbUtils.GetString(reader, "Body"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            PostId = DbUtils.GetInt(reader, "PostId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "UserProfileDisplayName"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileCreateDateTime"),
                            },
                            Post = new Post()
                            {
                                Id = DbUtils.GetInt(reader, "PostId"),
                            }
                        });
                    }
                    reader.Close();

                    return postComments;
                }
            }
        }

        public void Add(PostComment postComment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"

                        INSERT INTO PostComment (Body, CreateDateTime, UserProfileId, PostId)
                        OUTPUT INSERTED.ID
                        VALUES (@body, @createDateTime, @userProfileId, @postId)";

                    cmd.Parameters.AddWithValue("@body", postComment.Body);
                    cmd.Parameters.AddWithValue("@createDateTime", postComment.CreateDateTime);
                    cmd.Parameters.AddWithValue("@userProfileId", postComment.UserProfileId);
                    cmd.Parameters.AddWithValue("@postId", postComment.PostId);

                    postComment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
