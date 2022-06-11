using YardSale.Models;

namespace YardSale.Data_Access
{
    public interface ITreasureRepository
    {
        List<Treasure> GetAll();
        Treasure GetTreasureById(int id);
        Treasure GetTreasureByDesignerId(int designerId);
        Treasure GetTreasureByDescription(string treasureDesc);
        List<Treasure> GetTreasureByCategoryId(int treasureCategory);
       
        void AddTreasure(Treasure newTreasure);
        bool UpdateTreasure(Treasure treasureToUpdate);
        void DeleteTreasure(int id);
    }
}
