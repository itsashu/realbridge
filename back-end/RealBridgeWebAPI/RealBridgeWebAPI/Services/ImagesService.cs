using RealBridgeDataAccess;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core;
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

        public async Task<List<Image>> GetAllImages() => 
            await _realBridgeDBEntities.Images.ToListAsync().ConfigureAwait(false);

        public async Task<Image> GetImageById(int imageId) => 
            await _realBridgeDBEntities.Images.FirstAsync(img => img.ImageId == imageId).ConfigureAwait(false);

        public async Task AddImage(Image image)
        {
            _realBridgeDBEntities.Images.Add(image);
            await _realBridgeDBEntities.SaveChangesAsync();
        }

        public async Task UpdateImageDetails(Image updatedImage)
        {
            var image = await _realBridgeDBEntities.Images.FirstAsync(img => img.ImageId == updatedImage.ImageId).ConfigureAwait(false);
            if (image != null)
            {
                image.ImageTitle = updatedImage.ImageTitle;
                image.ImageDescription = updatedImage.ImageDescription;
                image.ImageData = updatedImage.ImageData;
                await _realBridgeDBEntities.SaveChangesAsync();
            }
            else
                throw new ObjectNotFoundException();
        }

        public async Task DeleteImageById(int imageId)
        {
            var image = await _realBridgeDBEntities.Images.FirstAsync(img => img.ImageId == imageId).ConfigureAwait(false);
            if (image != null)
            {
                _realBridgeDBEntities.Images.Remove(image);
                await _realBridgeDBEntities.SaveChangesAsync();
            }
            else
                throw new ObjectNotFoundException();
        }
    }
}