package net.pinehaus.backend.authentication.google.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.Optional;

@Service
@Slf4j
public class GoogleAuthenticationService {

    private final GoogleIdTokenVerifier verifier;

    public GoogleAuthenticationService(@Value("${app.google.client-id}") String GOOGLE_CLIENT_ID) {
        HttpTransport transport = new NetHttpTransport();
        JsonFactory jsonFactory = new GsonFactory();

        verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                .setAudience(Collections.singletonList(GOOGLE_CLIENT_ID))
                .build();
    }

    public Optional<GoogleIdToken> verifyToken(String credential) {
        try {
            GoogleIdToken token = verifier.verify(credential);

            if (token != null) {
                return Optional.of(token);
            }

            return Optional.empty();
        } catch (GeneralSecurityException | IOException e) {
            return Optional.empty();
        }
    }

}