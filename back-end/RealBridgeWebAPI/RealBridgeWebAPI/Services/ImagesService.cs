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

        public async Task<List<Image>> GetAllImages() => 
            await _realBridgeDBEntities.Images.AsNoTracking().ToListAsync().ConfigureAwait(false);

        public async Task<Image> GetImageById(int imageId) => 
            await _realBridgeDBEntities.Images.AsNoTracking().FirstOrDefaultAsync(img => img.ImageId == imageId);

        public async Task AddImage(Image image)
        {
            _realBridgeDBEntities.Images.Add(image);
            await _realBridgeDBEntities.SaveChangesAsync();
        }

        public async Task UpdateImageDetails(Image updatedImage)
        {
            var image = await _realBridgeDBEntities.Images.FirstOrDefaultAsync(img => img.ImageId == updatedImage.ImageId).ConfigureAwait(false);
            if (image.ImageId != 0)
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
            Image image = await _realBridgeDBEntities.Images.AsNoTracking().FirstOrDefaultAsync(img => img.ImageId == imageId).ConfigureAwait(false);
            if (image.ImageId != 0)
            {
                _realBridgeDBEntities.Images.Remove(image);
                await _realBridgeDBEntities.SaveChangesAsync();
            }
            else
                throw new ObjectNotFoundException();
        }
    }
}