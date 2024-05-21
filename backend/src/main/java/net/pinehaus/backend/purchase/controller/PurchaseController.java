package net.pinehaus.backend.purchase.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.pinehaus.backend.purchase.dto.CreatePurchaseDTO;
import net.pinehaus.backend.purchase.model.Purchase;
import net.pinehaus.backend.purchase.model.PurchaseViews;
import net.pinehaus.backend.purchase.service.PurchaseService;
import net.pinehaus.backend.security.UserPrincipal;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/purchase")
@Tag(name = "User product purchase history")
@RequiredArgsConstructor
@Slf4j
public class PurchaseController {

  private final PurchaseService purchaseService;

  @JsonView(PurchaseViews.Public.class)
  @Operation(summary = "Get purchase by id", description = "Fetch purchase by id.")
  @ApiResponses({@ApiResponse(responseCode = "200"), @ApiResponse(responseCode = "404")})
  @GetMapping("/{id}")
  public Purchase getPurchaseById(@PathVariable int id) {
    return purchaseService.getPurchaseById(id).orElseThrow(() ->
        new ResponseStatusException(HttpStatus.NOT_FOUND, "Purchase not found"));
  }

  @JsonView(PurchaseViews.Public.class)
  @Operation(summary = "Get purchase history", description = "Fetch purchase history for current user.")
  @ApiResponses({@ApiResponse(responseCode = "200")})
  @GetMapping("/history")
  public List<Purchase> getPurchaseById(@AuthenticationPrincipal UserPrincipal currentUser) {
    return purchaseService.getPurchasesForUser(currentUser.getId());
  }

  @PostMapping("/create")
  @Operation(summary = "Create purchase", description = "Create a new purchase.")
  @ApiResponses({@ApiResponse(responseCode = "200"), @ApiResponse(responseCode = "400")})
  @JsonView(PurchaseViews.Public.class)
  public Purchase createPurchase(@RequestBody CreatePurchaseDTO createPurchaseDTO,
      @AuthenticationPrincipal UserPrincipal currentUser) {
    return purchaseService.createPurchase(createPurchaseDTO, currentUser.getUser());
  }

}