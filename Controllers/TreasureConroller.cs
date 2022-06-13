using Microsoft.AspNetCore.Mvc;
using YardSale.Data_Access;
using YardSale.Models;

namespace YardSale.Controllers
{
    [Route("api/treasures/")]
    [ApiController]
    public class TreasuresController : ControllerBase

    {
        private readonly ITreasureRepository _treasureRepository;
        public TreasuresController(ITreasureRepository treasureRepository)
        {
            _treasureRepository = treasureRepository;
        }

        [HttpGet]
        public List<Treasure> GetAllTreasures()
        {
            return _treasureRepository.GetAll();
        }

        [Route("getTreasureById/{treasureId}")]
        [HttpGet]

        public IActionResult GetTreasureByID(int treasureId)
        {
            var match = _treasureRepository.GetTreasureById(treasureId);
            if (match == null)
            {
                return NotFound();
            }

            return Ok(match);
        }

        [Route("getTreasureByDescription/{description}")]
        [HttpGet]
        public IActionResult GetTreasureByDescription(string description)
        {
            var match = _treasureRepository.GetTreasureByDescription(description);
            if (match == null)
            {
                return NotFound();
            }

            return Ok(match);
        }

        [Route("getTreasureDesignerId/{designerId}")]
        [HttpGet]
        public IActionResult GetByTreasureDesignerId(int designerId)
        {
            var matches = _treasureRepository.GetTreasureByDesignerId(designerId);
            if (matches != null)
            {
                return Ok(matches);
            }
            else
            {
                return NotFound();
            }
        }

        [Route("getTreasureByCategoryId/{categoryId}")]
        [HttpGet]
        public IActionResult GetTreasureByCategoryId(int categoryId)
        {
            var matches = _treasureRepository.GetTreasureByCategoryId(categoryId);
            if (matches != null)
            {
                return Ok(matches);
            }
            else
            {
                return NotFound();
            }
        }

        [Route("putTreasure")]
        [HttpPut]
        public IActionResult UpdateTreasure(Treasure treasureToUpdate)
        {
            var match = _treasureRepository.GetTreasureById(treasureToUpdate.TreasureId);
            if (match == null)
            {

                return NotFound();

            }

            match.TreasureId = treasureToUpdate.TreasureId;
            match.Description = treasureToUpdate.Description;
            match.DesignerId = treasureToUpdate.DesignerId;
            match.CategoryId = treasureToUpdate.CategoryId;
            match.Price = treasureToUpdate.Price;
            match.Image = treasureToUpdate.Image;

            _treasureRepository.UpdateTreasure(match);
            return NoContent();
        }

        [Route("removeTreasure/{id}")]
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            var match = _treasureRepository.GetTreasureById(id);
            if (match == null)
            {
                return NotFound();
            }
            else
            {
                _treasureRepository.DeleteTreasure(id);
                return NoContent();
            }
        }

        [Route("createTreasure")]
        [HttpPost]
        public IActionResult CreateTreasure(Treasure newTreasure)
        {
            if (newTreasure == null)
            {
                return NotFound();
            }
            else
            {
                _treasureRepository.AddTreasure(newTreasure);
                return Ok(newTreasure);
            }
        }
    }
}



