/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(["exports","./defined-b9ff0e39","./Check-e6691f86","./defaultValue-199f5aa8","./Math-2145e044","./Cartesian2-40ed5530","./Transforms-94513c2d","./ComponentDatatype-9477db2c","./GeometryAttribute-4754007e","./GeometryAttributes-c3465b51","./IndexDatatype-668aa2f9","./GeometryOffsetAttribute-5aa2ee88"],function(e,R,c,C,N,q,B,S,U,F,W,Y){"use strict";var f=new q.Cartesian3(1,1,1),J=Math.cos,j=Math.sin;function p(e){e=C.defaultValue(e,C.defaultValue.EMPTY_OBJECT);var t=C.defaultValue(e.radii,f),i=C.defaultValue(e.innerRadii,t),r=C.defaultValue(e.minimumClock,0),a=C.defaultValue(e.maximumClock,N.CesiumMath.TWO_PI),o=C.defaultValue(e.minimumCone,0),n=C.defaultValue(e.maximumCone,N.CesiumMath.PI),s=Math.round(C.defaultValue(e.stackPartitions,10)),u=Math.round(C.defaultValue(e.slicePartitions,8)),m=Math.round(C.defaultValue(e.subdivisions,128));if(s<1)throw new c.DeveloperError("options.stackPartitions cannot be less than 1");if(u<0)throw new c.DeveloperError("options.slicePartitions cannot be less than 0");if(m<0)throw new c.DeveloperError("options.subdivisions must be greater than or equal to zero.");if(R.defined(e.offsetAttribute)&&e.offsetAttribute===Y.GeometryOffsetAttribute.TOP)throw new c.DeveloperError("GeometryOffsetAttribute.TOP is not a supported options.offsetAttribute for this geometry.");this._radii=q.Cartesian3.clone(t),this._innerRadii=q.Cartesian3.clone(i),this._minimumClock=r,this._maximumClock=a,this._minimumCone=o,this._maximumCone=n,this._stackPartitions=s,this._slicePartitions=u,this._subdivisions=m,this._offsetAttribute=e.offsetAttribute,this._workerName="createEllipsoidOutlineGeometry"}p.packedLength=2*q.Cartesian3.packedLength+8,p.pack=function(e,t,i){if(!R.defined(e))throw new c.DeveloperError("value is required");if(!R.defined(t))throw new c.DeveloperError("array is required");return i=C.defaultValue(i,0),q.Cartesian3.pack(e._radii,t,i),i+=q.Cartesian3.packedLength,q.Cartesian3.pack(e._innerRadii,t,i),i+=q.Cartesian3.packedLength,t[i++]=e._minimumClock,t[i++]=e._maximumClock,t[i++]=e._minimumCone,t[i++]=e._maximumCone,t[i++]=e._stackPartitions,t[i++]=e._slicePartitions,t[i++]=e._subdivisions,t[i]=C.defaultValue(e._offsetAttribute,-1),t};var h=new q.Cartesian3,_=new q.Cartesian3,v={radii:h,innerRadii:_,minimumClock:void 0,maximumClock:void 0,minimumCone:void 0,maximumCone:void 0,stackPartitions:void 0,slicePartitions:void 0,subdivisions:void 0,offsetAttribute:void 0};p.unpack=function(e,t,i){if(!R.defined(e))throw new c.DeveloperError("array is required");t=C.defaultValue(t,0);var r=q.Cartesian3.unpack(e,t,h);t+=q.Cartesian3.packedLength;var a=q.Cartesian3.unpack(e,t,_);t+=q.Cartesian3.packedLength;var o=e[t++],n=e[t++],s=e[t++],u=e[t++],m=e[t++],f=e[t++],d=e[t++],l=e[t];return R.defined(i)?(i._radii=q.Cartesian3.clone(r,i._radii),i._innerRadii=q.Cartesian3.clone(a,i._innerRadii),i._minimumClock=o,i._maximumClock=n,i._minimumCone=s,i._maximumCone=u,i._stackPartitions=m,i._slicePartitions=f,i._subdivisions=d,i._offsetAttribute=-1===l?void 0:l,i):(v.minimumClock=o,v.maximumClock=n,v.minimumCone=s,v.maximumCone=u,v.stackPartitions=m,v.slicePartitions=f,v.subdivisions=d,v.offsetAttribute=-1===l?void 0:l,new p(v))},p.createGeometry=function(e){var t=e._radii;if(!(t.x<=0||t.y<=0||t.z<=0)){var i=e._innerRadii;if(!(i.x<=0||i.y<=0||i.z<=0)){var r=e._minimumClock,a=e._maximumClock,o=e._minimumCone,n=e._maximumCone,s=e._subdivisions,u=q.Ellipsoid.fromCartesian3(t),m=e._slicePartitions+1,f=e._stackPartitions+1;(m=Math.round(m*Math.abs(a-r)/N.CesiumMath.TWO_PI))<2&&(m=2),(f=Math.round(f*Math.abs(n-o)/N.CesiumMath.PI))<2&&(f=2);var d=0,l=1,c=i.x!==t.x||i.y!==t.y||i.z!==t.z,C=!1,p=!1;c&&(l=2,0<o&&(C=!0,d+=m),n<Math.PI&&(p=!0,d+=m));var h,_,v,y,b=s*l*(f+m),k=new Float64Array(3*b),A=2*(b+d-(m+f)*l),w=W.IndexDatatype.createTypedArray(b,A),P=0,x=new Array(f),E=new Array(f);for(h=0;h<f;h++)y=o+h*(n-o)/(f-1),x[h]=j(y),E[h]=J(y);var D=new Array(s),M=new Array(s);for(h=0;h<s;h++)v=r+h*(a-r)/(s-1),D[h]=j(v),M[h]=J(v);for(h=0;h<f;h++)for(_=0;_<s;_++)k[P++]=t.x*x[h]*M[_],k[P++]=t.y*x[h]*D[_],k[P++]=t.z*E[h];if(c)for(h=0;h<f;h++)for(_=0;_<s;_++)k[P++]=i.x*x[h]*M[_],k[P++]=i.y*x[h]*D[_],k[P++]=i.z*E[h];for(x.length=s,E.length=s,h=0;h<s;h++)y=o+h*(n-o)/(s-1),x[h]=j(y),E[h]=J(y);for(D.length=m,M.length=m,h=0;h<m;h++)v=r+h*(a-r)/(m-1),D[h]=j(v),M[h]=J(v);for(h=0;h<s;h++)for(_=0;_<m;_++)k[P++]=t.x*x[h]*M[_],k[P++]=t.y*x[h]*D[_],k[P++]=t.z*E[h];if(c)for(h=0;h<s;h++)for(_=0;_<m;_++)k[P++]=i.x*x[h]*M[_],k[P++]=i.y*x[h]*D[_],k[P++]=i.z*E[h];for(h=P=0;h<f*l;h++){var g=h*s;for(_=0;_<s-1;_++)w[P++]=g+_,w[P++]=g+_+1}var V=f*s*l;for(h=0;h<m;h++)for(_=0;_<s-1;_++)w[P++]=V+h+_*m,w[P++]=V+h+(_+1)*m;if(c)for(V=f*s*l+m*s,h=0;h<m;h++)for(_=0;_<s-1;_++)w[P++]=V+h+_*m,w[P++]=V+h+(_+1)*m;if(c){var G=f*s*l,O=G+s*m;if(C)for(h=0;h<m;h++)w[P++]=G+h,w[P++]=O+h;if(p)for(G+=s*m-m,O+=s*m-m,h=0;h<m;h++)w[P++]=G+h,w[P++]=O+h}var T=new F.GeometryAttributes({position:new U.GeometryAttribute({componentDatatype:S.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:k})});if(R.defined(e._offsetAttribute)){var z=k.length,I=new Uint8Array(z/3),L=e._offsetAttribute===Y.GeometryOffsetAttribute.NONE?0:1;Y.arrayFill(I,L),T.applyOffset=new U.GeometryAttribute({componentDatatype:S.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:I})}return new U.Geometry({attributes:T,indices:w,primitiveType:U.PrimitiveType.LINES,boundingSphere:B.BoundingSphere.fromEllipsoid(u),offsetAttribute:e._offsetAttribute})}}},e.EllipsoidOutlineGeometry=p});