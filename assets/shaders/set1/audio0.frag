#include <common>

uniform vec3      iResolution;
uniform float     iTime;
uniform sampler2D iChannel0;
uniform float     brightness;

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
  // Normalized pixel coordinates (from 0 to 1)
	vec2 uv = fragCoord / iResolution.xy;

	// first texture row is frequency data
	float fft  = texture2D( iChannel0, vec2(uv.x,0.25) ).x;

    // second texture row is the sound wave
	float wave = texture2D( iChannel0, vec2(uv.x,0.75) ).x;

	// convert frequency to colors
	vec3 col = vec3(1.0)*fft;

    // add wave form on top
	col += 1.0 -  smoothstep( 0.0, 0.01, abs(wave - uv.y) );

    col = pow( col, vec3(1.0,0.5,2.0) );

	// output final color
	fragColor = vec4(col,1.0) * brightness;
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}

// Visual Features
// complexity=0
// contrast=0
// movement=0
