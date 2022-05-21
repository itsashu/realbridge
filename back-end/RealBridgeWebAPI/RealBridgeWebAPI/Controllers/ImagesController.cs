using RealBridgeDataAccess;
using RealBridgeWebAPI.Services;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
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
        [HttpGet]
        public async Task<HttpResponseMessage> GetAllImagesAsync()
        {
            try
            {
                List<ImageModel> images = await _imagesService.GetAllImages().ConfigureAwait(false);
                return Request.CreateResponse(HttpStatusCode.OK, images);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        // GET api/images?imageId={imageId:int}
        [HttpGet]
        public async Task<HttpResponseMessage> GetImageByIdAsync(int id)
        {
            if (id < 1)
                return Request.CreateResponse(HttpStatusCode.BadRequest, $"Invalid imageId: {id} provided");

            try
            {
                var image = await _imagesService.GetImageById(id).ConfigureAwait(false);
                return image != null
                    ? Request.CreateResponse(HttpStatusCode.OK, image)
                    : Request.CreateResponse(HttpStatusCode.NotFound, $"Image with ImageId: {id} not found");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        // POST api/images
        [HttpPost]
        public async Task<HttpResponseMessage> PostAsync()
        {
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                try
                {
                    var files = new List<HttpPostedFile>();
                    foreach (string eachfile in httpRequest.Files)
                    {
                        var postedFile = httpRequest.Files[eachfile];
                        files.Add(postedFile);
                    }

                    var file = files[0];
                    byte[] imageBuffer = new byte[file.ContentLength];
                    using (var binaryReader = new BinaryReader(file.InputStream))
                    {
                        imageBuffer = binaryReader.ReadBytes(file.ContentLength);
                    }
                    file.InputStream.Read(imageBuffer, 0, file.ContentLength);

                    var formData = httpRequest.Form;
                    ImageModel image = new ImageModel { Title = formData.Get("title"), Description = formData.Get("description"), Image = imageBuffer };

                    await _imagesService.AddImage(image).ConfigureAwait(false);

                    return Request.CreateResponse(HttpStatusCode.Created);
                }
                catch (Exception ex)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
                }
            }
            return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invaid Input or file");
        }

        // PUT api/images
        [HttpPut]
        public async Task<HttpResponseMessage> PutAsync([FromBody] ImageModel image)
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

        // DELETE api/images/?imageId={imageId:int}
        [HttpDelete]
        public async Task<HttpResponseMessage> DeleteImageByIdAsync(int id)
        {
            if (id < 1)
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid imageId");

            try
            {
                await _imagesService.DeleteImageById(id).ConfigureAwait(false);
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
