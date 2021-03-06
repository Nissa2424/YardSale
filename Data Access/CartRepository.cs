using System.Data.SqlClient;
using YardSale.Models;

namespace YardSale.Data_Access
{
    public class CartRepository : ICartRepository
    {
        private readonly IConfiguration _config;
        public CartRepository(IConfiguration config)
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

        public List<Treasure> GetCartTreasures()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.TreasureId as CartTreasureId,
                        t.TreasureId as TreasureId,
                        t.CategoryId,
                        t.DesignerId,
                        t.Description,
                        t.Price,
                        t.ImageLink
                        FROM Cart as c
                        LEFT JOIN Treasure as t
                        ON c.TreasureId = t.TreasureId
                     ";

                    SqlDataReader reader = cmd.ExecuteReader();
                    List<Treasure> treasures = new List<Treasure>();
                    while (reader.Read())
                    {
                        if (reader["TreasureId"] != DBNull.Value)
                        {
                            Treasure treasure = new Treasure
                            {
                                TreasureId = reader.GetInt32(reader.GetOrdinal("TreasureId")),
                               CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                                DesignerId = reader.GetInt32(reader.GetOrdinal("DesignerId")),
                                Description = reader.GetString(reader.GetOrdinal("Description")),
                                Price = reader.GetDecimal(reader.GetOrdinal("Price")),
                                Image = reader.GetString(reader.GetOrdinal("ImageLink")),
                            };
                            treasures.Add(treasure);
                        }
                    }
                    reader.Close();
                    return treasures;
                }
            }
        }

        public bool TreasureFoundInCart(int treasureId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT * FROM Cart
                        WHERE TreasureId = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", treasureId);

                    SqlDataReader reader = cmd.ExecuteReader();
                    bool found = false;
                    while (reader.Read())
                    {
                        var tId = reader.GetInt32(reader.GetOrdinal("TreasureId"));
                        if (tId == treasureId)
                        {
                            found = true;
                        }
                    }
                    reader.Close();
                    return found;
                }
            }
        }



        public void AddCartTreasure(int treasureId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Cart (TreasureId)
                        VALUES (@id);
                     ";

                    cmd.Parameters.AddWithValue("@id", treasureId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteCartTreasure(int treasureId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE FROM Cart
                            WHERE TreasureId = @id
                        ";

                    cmd.Parameters.AddWithValue("@id", treasureId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}





