using RealBridgeDataAccess;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Linq;
using System.Threading.Tasks;

namespace RealBridgeWebAPI.Services
{
    public class ImagesService : IImagesService
    {
        private readonly RealBridgeDBEntities _realBridgeDBEntities;

        public ImagesService(RealBridgeDBEntities realBridgeDBEntities)
        {
            _realBridgeDBEntities = realBridgeDBEntities;
        }

        public async Task<List<ImageModel>> GetAllImages() => 
            await _realBridgeDBEntities.ImageModels.AsNoTracking().ToListAsync().ConfigureAwait(false);

        public async Task<ImageModel> GetImageById(int id) => 
            await _realBridgeDBEntities.ImageModels.AsNoTracking().FirstOrDefaultAsync(img => img.Id == id);

        public async Task AddImage(ImageModel image)
        {
            //ImageModel imageModel = new ImageModel { Description = image.description, Title = image.title, Image = image.image };
            _realBridgeDBEntities.ImageModels.Add(image);
            await _realBridgeDBEntities.SaveChangesAsync();
        }

        public async Task UpdateImageDetails(ImageModel updatedImage)
        {
            var image = await _realBridgeDBEntities.ImageModels.FirstOrDefaultAsync(img => img.Id == updatedImage.Id).ConfigureAwait(false);
            if (image.Id != 0)
            {
                image.Title = updatedImage.Title;
                image.Description = updatedImage.Description;
                await _realBridgeDBEntities.SaveChangesAsync();
            }
            else
                throw new ObjectNotFoundException();
        }

        public async Task DeleteImageById(int id)
        {
            ImageModel image = await _realBridgeDBEntities.ImageModels.FirstOrDefaultAsync(img => img.Id == id).ConfigureAwait(false);
            if (image.Id != 0)
            {
                _realBridgeDBEntities.ImageModels.Remove(image);
                await _realBridgeDBEntities.SaveChangesAsync();
            }
            else
                throw new ObjectNotFoundException();
        }
    }
}