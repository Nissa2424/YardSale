using YardSale.Models;
using System.Data.SqlClient;
using YardSale.Data_Access;

namespace YardSale.Data_Access
{
    public class TreasureRepository : ITreasureRepository
    {
        private readonly IConfiguration _config;

        public TreasureRepository(IConfiguration config)
        {
            _config = config;
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
            }
        }

        private List<Treasure> ReadTreasures(SqlDataReader _reader)
        {
            var treasures = new List<Treasure>();
            while (_reader.Read())
            {
                Treasure treasure = new Treasure()
                {
                    TreasureId = _reader.GetInt32(_reader.GetOrdinal("TreasureId")),
                    DesignerId = _reader.GetInt32(_reader.GetOrdinal("DesignerId")),
                    CategoryId = _reader.GetInt32(_reader.GetOrdinal("CategoryId")),
                    Description = _reader.GetString(_reader.GetOrdinal("Description")),
                    Price = _reader.GetDecimal(_reader.GetOrdinal("Price")),
                    Image = _reader.GetString(_reader.GetOrdinal("ImageLink"))
                };
                treasures.Add(treasure);
            }
            _reader.Close();
            return treasures;
        }

        public List<Treasure> GetAll()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Treasure
                    ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var treasures = ReadTreasures(reader);
                        return treasures;
                    }
                }
            }
        }

        public Treasure GetTreasureById(int _id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Treasure
                        WHERE TreasureId = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", _id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var treasure = ReadTreasures(reader).FirstOrDefault();
                        return treasure;
                    }
                }
            }
        }


        public void DeleteTreasure(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Treasure
                        WHERE TreasureId = @TreasureId
                    ";
                    cmd.Parameters.AddWithValue("@TreasureId", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public Treasure GetTreasureByDesignerId(int designerId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Treasure
                        WHERE Treasure.designerId = @designerid
                    ";

                    cmd.Parameters.AddWithValue("@designerid", designerId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var treasure = ReadTreasures(reader).FirstOrDefault();
                        return treasure;
                    }
                }
            }
        }

        public Treasure GetTreasureByDescription(string treasureDesc)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  t.treasureId,
                                t.designerId,
                                t.categoryId,
                                t.description,
                                t.price,
                                t.imageLink
                        FROM Treasure t
                        WHERE t.description = @treasureDesc 
                    ";

                    cmd.Parameters.AddWithValue("@treasureDesc", treasureDesc);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var treasure = ReadTreasures(reader).FirstOrDefault();
                        return treasure;
                    }
                }
            }
        }

        public List<Treasure> GetTreasureByCategoryId(int categoryId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT  t.treasureId,
                                t.designerId,
                                t.categoryId,
                                c.name,
                                t.description,
                                t.price,
                                t.imageLink
                        FROM Treasure t
                        JOIN Category c on t.categoryId = c.categoryId
                        WHERE t.categoryId = @categoryId 
                    ";
                    cmd.Parameters.AddWithValue("@categoryId", categoryId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        return ReadTreasures(reader).ToList();
                       
                    }
                }
            }
        }

        public void AddTreasure(Treasure newTreasure)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [dbo].[Treasure] (Description, DesignerId, CategoryId, ImageLink, Price)
                        VALUES (@Description, @DesignerId, @CateoryId, @ImageLink, @Price)
                    ";
                    cmd.Parameters.AddWithValue("@Description", newTreasure.Description);
                    cmd.Parameters.AddWithValue("@DesignerId", newTreasure.DesignerId);
                    cmd.Parameters.AddWithValue("@CateoryId", newTreasure.CategoryId);
                    cmd.Parameters.AddWithValue("@ImageLink", newTreasure.Image);
                    cmd.Parameters.AddWithValue("@Price", newTreasure.Price);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public bool UpdateTreasure(Treasure treasureToUpdate)
        {
            try
            {
                using (SqlConnection conn = Connection)
                {
                    conn.Open();
                    using (SqlCommand cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                            UPDATE Treasure
                            SET     Description = @Description,
                                    DesignerId = @DesignerId,
                                    CategoryId = @CategoryId,
                                    ImageLink = @ImageLink,
                                    Price = @Price
                            WHERE treasureId = @TreasureId
                        ";
                        cmd.Parameters.AddWithValue("@TreasureId", treasureToUpdate.TreasureId);
                        cmd.Parameters.AddWithValue("@Description", treasureToUpdate.Description);
                        cmd.Parameters.AddWithValue("@DesignerId", treasureToUpdate.DesignerId);
                        cmd.Parameters.AddWithValue("@CategoryId", treasureToUpdate.CategoryId);
                        cmd.Parameters.AddWithValue("@ImageLink", treasureToUpdate.Image);
                        cmd.Parameters.AddWithValue("@Price", treasureToUpdate.Price);

                        cmd.ExecuteNonQuery();
                    }
                }
                return true;
            }catch(Exception ex)
            {
                throw ex.InnerException;
            }
           
        }
    }
}



