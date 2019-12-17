let frag = `
#ifdef GL_ES
precision mediump float;
#endif

#define DEBUG 0
uniform vec2 iResolution;
uniform sampler2D webcam;
uniform sampler2D palette;
uniform float numChars;

void drawLines(){
	// draw debug lines
  #if(DEBUG)
	if(mod(gl_FragCoord.x, iResolution.x/numCells) <= 1.){
		gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
	}
	if(mod(gl_FragCoord.y, iResolution.y/numCells) <= 1.){
		gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
	}
  #endif
}

uniform float numCells;

float diff(vec3 col1, vec3 col2){
  float d = 0.0;
  d += pow( col1.r - col2.r, 2.0);
  d += pow( col1.g - col2.g, 2.0);
  d += pow( col1.b - col2.b, 2.0);
  return sqrt(d);
}

void main(){
	vec2 uv = vec2(gl_FragCoord.xy) / iResolution;
	vec2 UV = vec2(gl_FragCoord.xy) / iResolution;
    
	uv.y = 1.0 - uv.y;
	UV.y = 1.0 - UV.y;
	uv = floor(uv*(numCells))/numCells;

	vec3 col = vec3(texture2D(webcam, uv));

	float step = 1.0/numChars;
	float minDelta = 255. * 3.0;
	float startX = 0.0;

	for( float x = 0.0; x < 1.0; x += 0.001492537313 ){
		vec3 paletteCol = vec3(texture2D(palette, vec2(x + step/1.0, 0.75)));
		float delta = diff(paletteCol, col); 
		if(delta < minDelta){
			minDelta = delta;
			startX = x;
		}
	}
  float x = startX + mod(UV.x, 1./numCells) * numCells / numChars;
	float y = mod(UV.y, 1.0/numCells) * numCells;
	y /= 2.0;
	vec3 paletteCell = vec3(texture2D(palette, vec2( x, y )));
	gl_FragColor = vec4(paletteCell, 1.0);	
	drawLines();
}`;
