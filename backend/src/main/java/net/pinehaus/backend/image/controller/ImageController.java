package net.pinehaus.backend.image.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.HashMap;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.pinehaus.backend.image.service.ImageService;
import net.pinehaus.backend.util.ResponseUtilities;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Tag(name = "Images")
@RequestMapping("/images")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('USER')")
@Slf4j
public class ImageController {

  private final ImageService imageService;

  @PostMapping
  @Operation(summary = "Upload an image.",
      description = "Upload an image file to the server.")
  @ApiResponses({
      @ApiResponse(responseCode = "200", description = "Image uploaded successfully and in body returned is image name on CDN.")})
  public ResponseEntity<HashMap<String, String>> uploadImage(
      @RequestParam("file") MultipartFile file) {
    try {
      String filename = imageService.saveImage(file, UUID.randomUUID().toString());

      return new ResponseEntity<>(ResponseUtilities.createResponse("image", filename),
          HttpStatus.OK);
    } catch (Exception e) {
      log.error("failed to upload image", e);

      return new ResponseEntity<>(ResponseUtilities.errorResponse(e.getMessage()),
          HttpStatus.BAD_REQUEST);
    }
  }
}