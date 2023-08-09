using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using AEWRPod2.Models;
using AEWRPod2.Utils;

namespace AEWRPod2.Repositories
{
    public class ClipCommentRepository : BaseRepository, IClipCommentRepository
    {
        public ClipCommentRepository(IConfiguration configuration) : base(configuration) { }

        public List<ClipComment> GetClipComments(int clipId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT cc.Id, cc.Body, cc.CreateDateTime, cc.UserProfileId, cc.ClipId,
                               up.DisplayName AS UserProfileDisplayName,
                               up.CreateDateTime AS UserProfileCreateDateTime
                          FROM ClipComment cc
                               LEFT JOIN UserProfile up ON cc.UserProfileId = up.Id
                               LEFT JOIN Clip c ON cc.ClipId = c.Id
                         WHERE cc.ClipId = @clipId
                      ORDER BY cc.CreateDateTime DESC";

                    DbUtils.AddParameter(cmd, "@clipId", clipId);

                    var reader = cmd.ExecuteReader();

                    var clipComments = new List<ClipComment>();

                    while (reader.Read())
                    {
                        clipComments.Add(new ClipComment()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Body = DbUtils.GetString(reader, "Body"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            ClipId = DbUtils.GetInt(reader, "ClipId"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfileId"),
                                DisplayName = DbUtils.GetString(reader, "UserProfileDisplayName"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileCreateDateTime"),
                            },
                            Clip = new Clip()
                            {
                                Id = DbUtils.GetInt(reader, "ClipId"),
                            }
                        });
                    }
                    reader.Close();

                    return clipComments;
                }
            }
        }

        public void Add(ClipComment clipComment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ClipComment (Body, CreateDateTime, UserProfileId, ClipId)
                        OUTPUT INSERTED.ID
                        VALUES (@body, @createDateTime, @userProfileId, @clipId)";

                    cmd.Parameters.AddWithValue("@body", clipComment.Body);
                    cmd.Parameters.AddWithValue("@createDateTime", clipComment.CreateDateTime);
                    cmd.Parameters.AddWithValue("@userProfileId", clipComment.UserProfileId);
                    cmd.Parameters.AddWithValue("@clipId", clipComment.ClipId);

                    clipComment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(ClipComment clipComment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE ClipComment
                           SET Body = @body,
                               CreateDateTime = @createDateTime,
                               UserProfileId = @userProfileId,
                               ClipId = @clipId
                         WHERE Id = @id";

                    cmd.Parameters.AddWithValue("@body", clipComment.Body);
                    cmd.Parameters.AddWithValue("@createDateTime", clipComment.CreateDateTime);
                    cmd.Parameters.AddWithValue("@userProfileId", clipComment.UserProfileId);
                    cmd.Parameters.AddWithValue("@clipId", clipComment.ClipId);
                    cmd.Parameters.AddWithValue("@id", clipComment.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int clipCommentId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM ClipComment WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", clipCommentId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
