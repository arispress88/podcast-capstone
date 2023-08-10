using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using AEWRPod2.Models;
using AEWRPod2.Utils;

namespace AEWRPod2.Repositories
{
    public class FullEpisodeRepository : BaseRepository, IFullEpisodeRepository
    {
        public FullEpisodeRepository(IConfiguration configuration) : base(configuration) { }

        public List<FullEpisode> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT fe.Id, fe.Title, fe.EpisodeUrl, fe.CreateDateTime, fe.CategoryId,
                               c.Name AS CategoryName
                        FROM FullEpisode fe
                        LEFT JOIN Category c ON fe.CategoryId = c.Id
                        ORDER BY fe.CreateDateTime DESC";

                    var reader = cmd.ExecuteReader();

                    var fullEpisodes = new List<FullEpisode>();
                    while (reader.Read())
                    {
                        fullEpisodes.Add(new FullEpisode()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Title = DbUtils.GetString(reader, "Title"),
                            EpisodeUrl = DbUtils.GetString(reader, "EpisodeUrl"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "CategoryName")
                            }
                        });
                    }

                    reader.Close();

                    return fullEpisodes;
                }
            }
        }

        public FullEpisode GetEpisodeByCategory(int CategoryId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT fe.Id, fe.Title, fe.EpisodeUrl, fe.CreateDateTime, fe.CategoryId,
                               c.Name AS CategoryName
                        FROM FullEpisode fe
                        LEFT JOIN Category c ON fe.CategoryId = c.Id
                        WHERE fe.CategoryId = @CategoryId
                        ORDER BY fe.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@CategoryId", CategoryId);

                    using (var reader = cmd.ExecuteReader())
                    {
                        FullEpisode fullEpisode = null;
                        if (reader.Read())
                        {
                            fullEpisode = new FullEpisode()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Title = DbUtils.GetString(reader, "Title"),
                                EpisodeUrl = DbUtils.GetString(reader, "EpisodeUrl"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                Category = new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "CategoryId"),
                                    Name = DbUtils.GetString(reader, "CategoryName")
                                }
                            };
                        }

                        reader.Close();

                        return fullEpisode;
                    }
                }
            }
        }

        public void Add(FullEpisode fullEpisode)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO FullEpisode (Title, EpisodeUrl, CreateDateTime, CategoryId)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @EpisodeUrl, @CreateDateTime, @CategoryId)";

                    DbUtils.AddParameter(cmd, "@Title", fullEpisode.Title);
                    DbUtils.AddParameter(cmd, "@EpisodeUrl", fullEpisode.EpisodeUrl);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", fullEpisode.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@CategoryId", fullEpisode.CategoryId);

                    fullEpisode.Id = (int)cmd.ExecuteScalar();
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
                    cmd.CommandText = "DELETE FROM FullEpisode WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
