using RealBridgeDataAccess;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RealBridgeWebAPI.Services
{
    public interface IImagesService
    {
        Task<List<Image>> GetAllImages();
        Task<Image> GetImageById(int imageId);
        Task AddImage(Image image);
        Task UpdateImageDetails(Image updatedImage);
        Task DeleteImageById(int imageId);
    }
}
