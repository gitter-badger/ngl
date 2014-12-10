
uniform float opacity;
uniform float nearClip;

varying vec4 cameraPos;

#ifdef PICKING
    varying vec3 vPickingColor;
#else
    varying vec3 color;
    varying vec3 vNormal;
#endif

#include light_params

#include fog_params


void main() {

    if( dot( cameraPos, vec4( 0.0, 0.0, 1.0, nearClip ) ) > 0.0 )
        discard;

    #ifdef PICKING
        gl_FragColor.xyz = vPickingColor;
        //gl_FragColor.xyz = vec3( 1.0, 0.0, 0.0 );
    #else
        vec3 transformedNormal = normalize( vNormal );
        #ifdef DOUBLE_SIDED
            transformedNormal = transformedNormal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );
        #endif

        vec3 vLightFront = vec3( 0.0, 0.0, 0.0 );

        #include light

        gl_FragColor = vec4( color, opacity );
        // gl_FragColor.xyz = vec3( 1.0, 0.0, 0.0 );
        gl_FragColor.xyz *= vLightFront;
        // gl_FragColor.xyz = normalx;
        //gl_FragColor.xyz = color;
    #endif

    #include fog
}
