using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using AEWRPod2.Models;
using AEWRPod2.Utils;

namespace AEWRPod2.Repositories
{
    public class ClipRepository : BaseRepository, IClipRepository
    {
        public ClipRepository(IConfiguration configuration) : base(configuration) { }

        public List<Clip> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.ClipUrl, c.UrlData, c.CreateDateTime, c.CategoryId,
                               cat.Name AS CategoryName
                          FROM Clip c
                               LEFT JOIN Category cat ON c.CategoryId = cat.Id
                      ORDER BY c.CreateDateTime DESC";

                    var reader = cmd.ExecuteReader();

                    var clips = new List<Clip>();
                    while (reader.Read())
                    {
                        clips.Add(new Clip()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ClipUrl = DbUtils.GetString(reader, "ClipUrl"),
                            UrlData = DbUtils.GetString(reader, "UrlData"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName"),
                            }
                        });
                    }

                    reader.Close();

                    return clips;
                }
            }
        }

        public Clip GetClipById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.ClipUrl, c.UrlData, c.CreateDateTime, c.CategoryId,
                               cat.Name AS CategoryName
                          FROM Clip c
                               LEFT JOIN Category cat ON c.CategoryId = cat.Id
                         WHERE c.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (var reader = cmd.ExecuteReader())
                    {
                        Clip clip = null;
                        if (reader.Read())
                        {
                            clip = new Clip()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                ClipUrl = DbUtils.GetString(reader, "ClipUrl"),
                                UrlData = DbUtils.GetString(reader, "UrlData"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                Category = new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "CategoryId"),
                                    Name = DbUtils.GetString(reader, "CategoryName"),
                                }
                            };
                        }

                        reader.Close();

                        return clip;
                    }
                }
            }
        }

        public Clip GetClipByCategory(int CategoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT c.Id, c.ClipUrl, c.UrlData, c.CreateDateTime, c.CategoryId,
                               cat.Name AS CategoryName
                          FROM Clip c
                               LEFT JOIN Category cat ON c.CategoryId = cat.Id
                         WHERE c.CategoryId = @CategoryId";

                    DbUtils.AddParameter(cmd, "@CategoryId", CategoryId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        Clip clip = null;
                        if (reader.Read())
                        {
                            clip = new Clip()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                ClipUrl = DbUtils.GetString(reader, "ClipUrl"),
                                UrlData = DbUtils.GetString(reader, "UrlData"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                Category = new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "CategoryId"),
                                    Name = DbUtils.GetString(reader, "CategoryName"),
                                }
                            };
                        }

                        reader.Close();

                        return clip;
                    }
                }
            }
        }

        public void Add(Clip clip)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Clip (ClipUrl, UrlData, CreateDateTime, CategoryId)
                        OUTPUT INSERTED.ID
                        VALUES (@ClipUrl, @UrlData, @CreateDateTime, @CategoryId)";

                    DbUtils.AddParameter(cmd, "@ClipUrl", clip.ClipUrl);
                    DbUtils.AddParameter(cmd, "@UrlData", clip.UrlData);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", clip.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@CategoryId", clip.CategoryId);

                    clip.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = @"
                        DELETE FROM Clip
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
