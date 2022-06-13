//using Microsoft.AspNetCore.Mvc;
//using YardSale.Data_Access;
//using YardSale.Models;

//namespace YardSale.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class CartController : ControllerBase
//    {
//        private readonly ICartRepository _cartRepo;
//        public CartController(ICartRepository cartRepository)
//        {
//            _cartRepo = cartRepository;
//        }

//        // GET: api/cart
//        [HttpGet]
//        public List<Treasure> Get()
//        {
//            return _cartRepo.GetCartTreasures();
//        }

//        [HttpPost("{id}")]
//        public IActionResult Post(string id)
//        {
//            var treasureId = int.Parse(id);
//            _cartRepo.AddCartTreasure(treasureId);
//            return Ok(treasureId);
//        }

//        [HttpDelete("{id}")]
//        public IActionResult Delete(int id)
//        {
//            if (!_cartRepo.TreasureFoundInCart(id))
//            {
//                return NotFound();
//            }
//            else
//            {
//                _cartRepo.DeleteCartTreasure(id);
//                return NoContent();
//            }
//        }
//    }
//}
