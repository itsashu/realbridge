using RealBridgeDataAccess;
using RealBridgeWebAPI.Services;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RealBridgeWebAPI.Controllers
{
    public class ImagesController : ApiController
    {
        private readonly IImagesService _imagesService;

        public ImagesController(IImagesService imagesService)
        {
            _imagesService = imagesService;
        }

        // GET api/images
        public async Task<HttpResponseMessage> GetAllImagesAsync()
        {
            try
            {
                List<Image> images = await _imagesService.GetAllImages().ConfigureAwait(false);
                return Request.CreateResponse(HttpStatusCode.OK, images);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        // GET api/images/{imageId:int}
        public async Task<HttpResponseMessage> GetImageByIdAsync(int imageId)
        {
            if (imageId < 1)
                return Request.CreateResponse(HttpStatusCode.BadRequest, $"Invalid imageId: {imageId} provided");

            try
            {
                var image = await _imagesService.GetImageById(imageId).ConfigureAwait(false);
                return image != null 
                    ? Request.CreateResponse(HttpStatusCode.OK, image) 
                    : Request.CreateResponse(HttpStatusCode.NotFound, $"Image with ImageId: {imageId} not found");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        // POST api/images
        public async Task<HttpResponseMessage> PostAsync([FromBody] Image image)
        {
            if (image == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid image details provided");
            
            try
            {
                await _imagesService.AddImage(image).ConfigureAwait(false);
                return Request.CreateResponse(HttpStatusCode.Created);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        // PUT api/images
        public async Task<HttpResponseMessage> PutAsync([FromBody] Image image)
        {
            if (image == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid image details provided");

            try
            {
                await _imagesService.UpdateImageDetails(image).ConfigureAwait(false);
                return Request.CreateResponse(HttpStatusCode.NoContent);
            }
            catch (ObjectNotFoundException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Provided image was not found", ex);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        // DELETE api/images/{imageId: int}
        public async Task<HttpResponseMessage> DeleteImageByIdAsync(int imageId)
        {
            if (imageId < 1)
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid imageId");

            try
            {
                await _imagesService.DeleteImageById(imageId).ConfigureAwait(false);
                return Request.CreateResponse(HttpStatusCode.NoContent);
            }
            catch (ObjectNotFoundException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Provided image was not found", ex);

            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
    }
}
