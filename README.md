# MCP Docent Server
[![smithery badge](https://smithery.ai/badge/@dongprojectteam/mcp-docent-server)](https://smithery.ai/server/@dongprojectteam/mcp-docent-server)

> 이미지를 입력받아 해당 이미지에 대한 해설 텍스트(docent)를 생성하는 MCP 서버입니다.  
> AI 기반 해설 시스템을 활용하여 다양한 이미지에 대해 자동으로 설명을 생성합니다.

---

## 주요 기능

- 이미지 파일을 업로드하면 AI가 해당 이미지를 분석하여 해설 문장을 생성
- 다양한 도슨트 도구 등록 기능 지원
- TypeScript 기반 Express 서버로 확장성 있는 구조

---

## 디렉토리 구조 및 주요 구성

```plaintext
src/
├── index.ts                     # 서버 엔트리 포인트
└── tools/
    └── registerDocentTool.ts   # 도슨트 도구 등록 로직
```

---

## LICENSE (MIT License)

```text
MIT License

Copyright (c) 2025 Dong Project Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell     
copies of the Software, and to permit persons to whom the Software is         
furnished to do so, subject to the following conditions:                      

The above copyright notice and this permission notice shall be included in    
all copies or substantial portions of the Software.                           

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR    
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,      
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE   
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER        
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN     
THE SOFTWARE.
```

