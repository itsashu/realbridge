using RealBridgeDataAccess;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RealBridgeWebAPI.Services
{
    public interface IImagesService
    {
        Task<List<ImageModel>> GetAllImages();
        Task<ImageModel> GetImageById(int id);
        Task<List<ImageModel>> AddImage(ImageModel image);
        Task UpdateImageDetails(ImageModel updatedImage);
        Task DeleteImageById(int id);
    }
}
