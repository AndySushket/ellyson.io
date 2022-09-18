
	uniform sampler2D saturnTexture;

	varying vec2 vUv;
	varying vec4 currentPostion;

	void main() {
	vec4 texture = texture2D( saturnTexture, vUv.xy );

	vec4 theColor = texture ;
	theColor.a = 1.0;
	if(currentPostion.z > 0.0){
	theColor.x -= currentPostion.z/80.0;
	theColor.y -= currentPostion.z/80.0;
	theColor.z -= currentPostion.z/80.0;
}
	gl_FragColor = theColor;
}