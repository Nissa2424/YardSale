namespace YardSale.Models
{
    public class Treasure
    {
        public int TreasureId { get; set; }
        public int? DesignerId { get; set; }
        public int? CategoryId { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public string? Image { get; set; }
        public string Category { get; internal set; }
    }
}

