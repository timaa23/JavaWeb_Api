package shop.services;

import lombok.SneakyThrows;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.web.client.RestOperations;
import shop.configuration.captcha.CaptchaSettings;
import shop.configuration.captcha.GoogleResponse;
import shop.dto.account.*;
import shop.configuration.security.JwtService;
import shop.constants.Roles;
import shop.entities.UserEntity;
import shop.entities.UserRoleEntity;
import shop.google.GoogleAuthService;
import shop.repositories.RoleRepository;
import shop.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import shop.repositories.UserRoleRepository;
import shop.storage.StorageService;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final UserRepository repository;
    private final RoleRepository roleRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final CaptchaSettings captchaSettings;
    private final RestOperations restTemplate;
    private final GoogleAuthService googleAuthService;
    private final StorageService storageService;
    private static final String GoogleAuthDefaultPassword = "r1ymxIrTAwf5Y7LloIza";
    private static final String GoogleAuthDefaultToken = "DefaultGoogleAuthWithNoToken";
    protected static final String RECAPTCHA_URL_TEMPLATE = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s";


    @SneakyThrows
    public AuthResponseDTO googleLogin(GoogleAuthDTO request) {
        var googleUserInfo = googleAuthService.verify(request.getToken());

        if (repository.findByEmail(googleUserInfo.getEmail()).isPresent()) {
            LoginDTO loginGoogle = new LoginDTO().builder()
                    .email(googleUserInfo.getEmail())
                    .password(GoogleAuthDefaultPassword)
                    .reCaptchaToken(request.getReCaptchaToken())
                    .build();

            return AuthResponseDTO.builder()
                    .token(login(loginGoogle).getToken())
                    .build();
        } else {
            RegisterDTO registerGoogle = new RegisterDTO().builder()
                    .email(googleUserInfo.getEmail())
                    .firstname("Unknown")
                    .lastname("Unknown")
                    .phone("Unknown")
                    .password(GoogleAuthDefaultPassword)
                    .reCaptchaToken(request.getReCaptchaToken())
                    .build();

            return AuthResponseDTO.builder()
                    .token(register(registerGoogle).getToken())
                    .build();
        }
    }

    @SneakyThrows
    public AuthResponseDTO register(RegisterDTO request) {
        if (!request.getReCaptchaToken().equals(GoogleAuthDefaultToken)) {
            String url = String.format(RECAPTCHA_URL_TEMPLATE, captchaSettings.getSecret(), request.getReCaptchaToken());
            final GoogleResponse googleResponse = restTemplate.getForObject(url, GoogleResponse.class);
            if (!googleResponse.isSuccess()) {   //перевіряємо чи запит успішний
                //throw new Exception("reCaptcha was not successfully validated");
                System.out.println("Error register captcha");
                return null;
            }
        }

        if (repository.findByEmail(request.getEmail()).isPresent()) {
            System.out.println("User already exists");
            throw new Exception("User already exists");
        }
        var user = UserEntity.builder()
                .firstName(request.getFirstname())
                .lastName(request.getLastname())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        repository.save(user);
        var role = roleRepository.findByName(Roles.User);
        var ur = new UserRoleEntity().builder()
                .user(user)
                .role(role)
                .build();
        userRoleRepository.save(ur);

        var jwtToken = jwtService.generateAccessToken(user);
        return AuthResponseDTO.builder()
                .token(jwtToken)
                .build();
    }

    public AuthResponseDTO login(LoginDTO request) {
        if (!request.getReCaptchaToken().equals(GoogleAuthDefaultToken)) {
            String url = String.format(RECAPTCHA_URL_TEMPLATE, captchaSettings.getSecret(), request.getReCaptchaToken());
            final GoogleResponse googleResponse = restTemplate.getForObject(url, GoogleResponse.class);
            if (!googleResponse.isSuccess()) {   //перевіряємо чи запит успішний
                //throw new Exception("reCaptcha was not successfully validated");
                System.out.println("Error login captcha");
                return null;
            }
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateAccessToken(user);
        return AuthResponseDTO.builder()
                .token(jwtToken)
                .build();
    }

    @SneakyThrows
    public AuthResponseDTO changeImage(UserChangeImageDTO request) {
        if (request.getImage().isEmpty()) throw new Exception();
        jwtService.validate(request.getToken());

        var user = repository.findById(Integer.parseInt(jwtService.getUserId(request.getToken())))
                .orElseThrow();

        storageService.removeFile(user.getImage());

        String fileName = storageService.saveMultipartFile(request.getImage());
        user.setImage(fileName);

        repository.save(user);

        var jwtToken = jwtService.generateAccessToken(user);
        return AuthResponseDTO.builder()
                .token(jwtToken)
                .build();
    }
}