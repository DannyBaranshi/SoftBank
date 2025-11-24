package com.lta.bancocanon.software_bancario.Jwt;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.lta.bancocanon.software_bancario.Usuario.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;


@Service
public class JwtService {

    private static final String SECRET_KEY="u8Fv9sXzQpLr3tYw5aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890==";

    public String getToken(Usuario usuario) {
        return getToken(new HashMap<>(), usuario);   
    }

    public String getToken(Map<String, Object> extraClaims, Usuario usuario){
        return Jwts
        .builder()
        .setClaims(extraClaims)
        .setSubject(usuario.getId().toString())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis()+1000*60*24))
        .signWith(getKey(), SignatureAlgorithm.HS256)
        .compact();
    }

    private Key getKey() {
       byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
       return Keys.hmacShaKeyFor(keyBytes); 
    }

    public String extractId(String token) {
        return getClaims(token,Claims::getSubject);
    }

    public boolean isTokenValid(String token, Usuario userDetails) {
        final String id = extractId(token); 
        return (id.equals(userDetails.getId().toString()) && !isTokenExpired(token)) ;
    }

    private Claims getAllClaims(String token){
        return Jwts
            .parserBuilder()
            .setSigningKey(getKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    public <T> T getClaims(String token, Function<Claims,T> claimsResolver){
        final Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Date getExpiration(String token){

        return getClaims(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token){

        return getExpiration(token).before(new Date());
    }
}
