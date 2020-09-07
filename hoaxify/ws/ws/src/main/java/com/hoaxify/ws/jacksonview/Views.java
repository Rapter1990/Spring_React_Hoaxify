package com.hoaxify.ws.jacksonview;

// JSON tarafında password @JsonIgnore deyince login işleminde hata oldu
// @JsonIgnore dememimiz sebebi auth olduğunda bu field görünmemesi bu yüzden o sorunu çözmek için (şifre gözükürse sorun olabilir.)
//Views interface oluşturduk.

public interface Views {

	class Base {}

	class Sensitive extends Base {}

}