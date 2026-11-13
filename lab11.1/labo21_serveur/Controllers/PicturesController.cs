using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Xml.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using semaine11_serveur.Data;
using semaine11_serveur.Models;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace semaine11_serveur.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PicturesController : ControllerBase
    {
        private readonly semaine11_serveurContext _context;

        public PicturesController(semaine11_serveurContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<int>>> GetPictureIds()
        {
            return Ok(_context.Picture.Select(p => p.Id));
        }

        [HttpGet]
        public async Task<ActionResult> GetPicture()
        {
            return Ok(_context.Picture.Select(p => p.Id));
        }

        [HttpPost]
        public async Task<ActionResult> PostPicture()
        {
            try
            {
                IFormCollection formCollection = await Request.ReadFormAsync();
                IFormFile? file = formCollection.Files.GetFile("image0"); // ⛔ Même clé que dans le FormData 😠

                if (file == null) return BadRequest(new { Message = "Fournis une image, niochon" });

                Image image = Image.Load(file.OpenReadStream());

                Picture picture = new Picture
                {
                    Id = 0,
                    FileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName),
                    MimeType = file.ContentType
                };

                // ⛔ Ce dossier (projet/images/big) DOIT déjà exister 📂 !! Créez-le d'abord !
                image.Save(Directory.GetCurrentDirectory() + "/images/big/" + picture.FileName);

                // 🤏 Optionnel mais souhaitable : réduire la taille de l'image pour sauvegarder une
                // copie miniature. Remarquez qu'on a utilisé un sous-dossier différent ! 📂
                image.Mutate(i => i.Resize(
                    new ResizeOptions() { Mode = ResizeMode.Min, Size = new Size() { Height = 200 } }));
                image.Save(Directory.GetCurrentDirectory() + "/images/smol/" + picture.FileName);

                _context.Picture.Add(picture);
                await _context.SaveChangesAsync();

                // La seule chose dont le client pourrait avoir besoin, c'est l'id de l'image.
                // On aurait pu ne rien retourner aussi, selon les besoins du client Next.js.
                return Ok(picture.Id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePicture(int id)
        {

            Picture? si = await _context.Picture.FindAsync(id);
            if (si == null) return NotFound(new { Message = "Aucune image trouvée avec cet id." });

            // Supprimer toutes les éventuelles tailles existantes du disque
            System.IO.File.Delete(Directory.GetCurrentDirectory() + "/images/big/" + si.FileName);
            System.IO.File.Delete(Directory.GetCurrentDirectory() + "/images/smol/" + si.FileName);

            _context.Picture.Remove(si);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
