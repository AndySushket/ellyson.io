'use client';

import { Highlight, themes } from 'prism-react-renderer';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { styled } from '@mui/material/styles';

const EditorContainer = styled('div')({
  display: 'flex',
  gap: '20px',
  padding: '20px',
  height: '100vh',
  paddingTop: '50px',
});

const CodeEditorWrapper = styled('div')({
  width: '50%',
  height: '90%',
  position: 'relative',
  '& pre': {
    margin: 0,
    height: '100% !important',
    borderRadius: '4px',
    fontSize: '14px !important',
    backgroundColor: '#1e1e1e !important',
    padding: '10px',
  },
  '& textarea': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resize: 'none',
    color: 'transparent',
    backgroundColor: 'transparent',
    caretColor: 'white',
    border: '1px solid #333',
    fontSize: '14px',
    fontFamily: 'monospace',
    padding: '10px',
    whiteSpace: 'pre',
    overflow: 'auto',
    zIndex: 1,
  },
  '& code': {
    fontFamily: 'monospace !important',
  },
  // Добавляем специфичные стили для GLSL
  '& .token.keyword': {
    color: '#569cd6'  // цвет ключевых слов как в VS Code
  },
  '& .token.function': {
    color: '#dcdcaa'  // цвет функций
  },
  '& .token.number': {
    color: '#b5cea8'  // цвет чисел
  },
  '& .token.comment': {
    color: '#6a9955'  // цвет комментариев
  },
  '& .token.operator': {
    color: '#d4d4d4'  // цвет операторов
  },
  '& .token.punctuation': {
    color: '#d4d4d4'  // цвет пунктуации
  }
});

const Canvas = styled('div')({
  width: '50%',
  height: '90%',
});

// Базовый вертексный шейдер
const defaultVertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Базовый фрагментный шейдер
const defaultFragmentShader = `
#ifdef GL_ES
precision highp float;
#endif

uniform float time;
varying vec2 vUv;

void main() {
    // Объявляем выходной цвет (4D вектор - RGBA)
    vec4 o;
    
    // r используется для нормализации размера экрана
    vec2 r = vec2(1.0);
    
    // Сохраняем время для удобства использования в анимации
    float t = time;
    
    // UV-координаты текущего пикселя (от 0 до 1 по обеим осям)
    vec2 FC = vUv;
    
    // Преобразуем координаты из [0,1] в [-1,1] и масштабируем пространство
    // FC.xy*2.-r переводит координаты в диапазон [-1,1]
    // Деление на r.y/.7 масштабирует пространство для лучшего отображения эффекта
    vec2 p=(FC.xy*2.-r)/r.y/.7;
    
    // Вектор направления для создания асимметрии в узоре
    vec2 d=vec2(-1,1);
    
    // Создаем базовый паттерн используя матричное преобразование
    // dot(5.*p-d,5.*p-d) создает радиальный градиент
    // Результат сохраняется в c и используется как основа для дальнейших искажений
    vec2 c=p*mat2(1,1,d/(.1+5./dot(5.*p-d,5.*p-d)));
    
    // Копируем базовый паттерн для создания волнового эффекта
    vec2 v=c;
    
    // Применяем логарифмическую спираль с анимацией по времени
    // log(length(v)) создает логарифмическую спираль
    // t*.2 добавляет вращение во времени
    // Умножение на 5 усиливает эффект
    v*=mat2(cos(log(length(v))+t*.2+vec4(0,33,11,0)))*5.;
    
    // Итеративно накладываем волновые эффекты
    // 9 итераций для создания сложного узора
    for(float i=0.;i++<9.;o+=sin(v.xyyx)+1.)
        // Каждая итерация добавляет синусоидальную волну с уменьшающейся амплитудой
        // v.yx меняет компоненты местами для разнообразия узора
        // Деление на i уменьшает влияние каждой следующей итерации
        v+=.7*sin(v.yx*i+t)/i+.5;
    
    // Финальное преобразование цвета:
    // 1. Используем экспоненты для создания резких переходов
    // 2. c.x*vec4(.6,-.4,-1,0) задает базовый цветовой градиент
    // 3. length(p)-.7 создает кольцевой эффект
    // 4. Комбинируем все эффекты с помощью сложной формулы
    o=1.-exp(-exp(c.x*vec4(.6,-.4,-1,0))/o/(.1+.1*pow(length(sin(v/.3)*.2+c*vec2(1,2))-1.,2.))/(1.+7.*exp(.3*c.y-dot(c,c)))/(.03+abs(length(p)-.7))*.2);
    
    // Добавляем черный фон и устанавливаем полную непрозрачность
    // vec4(0.0, 0.0, 0.0, 1.0) - это черный цвет с альфа=1
    gl_FragColor = o + vec4(0.0, 0.0, 0.0, 1.0);
}
`;

const GLSLEditor = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [fragmentShader, setFragmentShader] = useState(defaultFragmentShader);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Инициализация Three.js
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    canvasRef.current.innerHTML = '';
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Создание материала с шейдерами
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: defaultVertexShader,
      fragmentShader: fragmentShader,
    });
    materialRef.current = material;

    // Создание полноэкранного квада
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Анимация
    const animate = () => {
      if (!materialRef.current) return;

      timeRef.current += 0.01;
      materialRef.current.uniforms.time.value = timeRef.current;

      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Обработка изменения размера окна
    const handleResize = () => {
      if (!canvasRef.current || !renderer) return;

      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Обновление шейдера при изменении кода
  useEffect(() => {
    if (!materialRef.current) return;

    try {
      materialRef.current.fragmentShader = fragmentShader;
      materialRef.current.needsUpdate = true;
    } catch (error) {
      console.error('Shader compilation error:', error);
    }
  }, [fragmentShader]);

  const handleShaderChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFragmentShader(e.target.value);
  };

  return (
    <EditorContainer>
      <CodeEditorWrapper>
        <textarea
          value={fragmentShader}
          onChange={handleShaderChange}
          spellCheck="false"
        />
        <Highlight
          theme={themes.nightOwl}
          code={fragmentShader}
          language="cpp"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={{
              ...style,
              margin: 0,
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
            }}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </CodeEditorWrapper>
      <Canvas ref={canvasRef} />
    </EditorContainer>
  );
};

export default GLSLEditor;
