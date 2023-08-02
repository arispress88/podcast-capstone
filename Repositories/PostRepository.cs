using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using AEWRPod2.Models;
using AEWRPod2.Utils;

namespace AEWRPod2.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"

                        SELECT p.Id, p.Title, p.Body, p.CreateDateTime, p.UserProfileId, up.DisplayName
                        FROM Post p
                        LEFT JOIN UserProfile up ON p.UserProfileId = up.Id
                        ORDER BY p.CreateDateTime DESC";

                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();
                    while (reader.Read())
                    {
                        posts.Add(new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Body = DbUtils.GetString(reader, "Body"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }
                        });
                    }

                    reader.Close();

                    return posts;
                }
            }
        }

        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"

                        SELECT p.Id, p.Title, p.Body, p.CreateDateTime, p.UserProfileId, up.DisplayName
                        FROM Post p
                        LEFT JOIN UserProfile up ON p.UserProfileId = up.Id
                        WHERE p.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    Post post = null;
                    if (reader.Read())
                    {
                        post = new Post()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            Body = DbUtils.GetString(reader, "Body"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            UserProfile = new UserProfile()
                            {
                                DisplayName = DbUtils.GetString(reader, "DisplayName")
                            }
                        };
                    }

                    reader.Close();

                    return post;
                }
            }
        }

        public void Add(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"

                        INSERT INTO Post (Title, Body, CreateDateTime, UserProfileId)
                        OUTPUT INSERTED.ID
                        VALUES (@title, @body, @createDateTime, @userProfileId)";

                    DbUtils.AddParameter(cmd, "@title", post.Title);
                    DbUtils.AddParameter(cmd, "@body", post.Body);
                    DbUtils.AddParameter(cmd, "@createDateTime", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@userProfileId", post.UserProfileId);

                    post.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Post WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Post post)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"

                        UPDATE Post
                        SET Title = @title,
                            Body = @body,
                            CreateDateTime = @createDateTime,
                            UserProfileId = @userProfileId
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@title", post.Title);
                    DbUtils.AddParameter(cmd, "@body", post.Body);
                    DbUtils.AddParameter(cmd, "@createDateTime", post.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@userProfileId", post.UserProfileId);
                    DbUtils.AddParameter(cmd, "@id", post.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
