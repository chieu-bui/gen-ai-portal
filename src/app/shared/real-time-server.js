const http = require('http');
const es = require('event-stream');
// Create a HTTP server
const test = [
    {
        "choices": [],
        "created": 0,
        "id": "",
        "model": "",
        "object": "",
        "prompt_filter_results": [
            {
                "prompt_index": 0,
                "content_filter_results": {}
            }
        ]
    },
    {
        "id": "azure_openai-1d1094b9-084a-40e2-a556-4a19976aae56",
        "created": 1728962152,
        "model": "azure_openai",
        "choices": [
            {
                "index": 0,
                "logprobs": null,
                "finish_reason": "stop"
            }
        ],
        "object": "chat.completion.chunk"
    },
    {
        "choices": [
            {
                "content_filter_results": {},
                "delta": {
                    "content": "",
                    "role": "assistant"
                },
                "finish_reason": null,
                "index": 0,
                "logprobs": null
            }
        ],
        "created": 1728962152,
        "id": "chatcmpl-AISKGHxNUE7folNe65uZYCsLO1kab",
        "model": "gpt-4o-2024-05-13",
        "object": "chat.completion.chunk",
        "system_fingerprint": "fp_67802d9a6d"
    },
    {
        "choices": [
            {
                "content_filter_results": {},
                "delta": {
                    "content": "",
                    "role": "assistant"
                },
                "finish_reason": null,
                "index": 0,
                "logprobs": null
            }
        ],
        "created": 1728962152,
        "id": "chatcmpl-AISKGHxNUE7folNe65uZYCsLO1kab",
        "model": "gpt-4o-2024-05-13",
        "object": "chat.completion.chunk",
        "system_fingerprint": "fp_67802d9a6d"
    },
    {
        "choices": [
            {
                "content_filter_results": {},
                "delta": {
                    "content": "",
                    "role": "assistant"
                },
                "finish_reason": null,
                "index": 0,
                "logprobs": null
            }
        ],
        "created": 1728962152,
        "id": "chatcmpl-AISKGHxNUE7folNe65uZYCsLO1kab",
        "model": "gpt-4o-2024-05-13",
        "object": "chat.completion.chunk",
        "system_fingerprint": "fp_67802d9a6d"
    },
    {
        "choices": [
            {
                "content_filter_results": {},
                "delta": {
                    "content": "",
                    "role": "assistant"
                },
                "finish_reason": null,
                "index": 0,
                "logprobs": null
            }
        ],
        "created": 1728962152,
        "id": "chatcmpl-AISKGHxNUE7folNe65uZYCsLO1kab",
        "model": "gpt-4o-2024-05-13",
        "object": "chat.completion.chunk",
        "system_fingerprint": "fp_67802d9a6d"
    },
    {
        "choices": [
            {
                "content_filter_results": {},
                "delta": {
                    "content": "",
                    "role": "assistant"
                },
                "finish_reason": null,
                "index": 0,
                "logprobs": null
            }
        ],
        "created": 1728962152,
        "id": "chatcmpl-AISKGHxNUE7folNe65uZYCsLO1kab",
        "model": "gpt-4o-2024-05-13",
        "object": "chat.completion.chunk",
        "system_fingerprint": "fp_67802d9a6d"
    },
    {
        "id": "azure_openai-8dc8cc16-3f5e-471f-bf3f-4823133b6dde",
        "created": 1728962152,
        "model": "azure_openai",
        "choices": [
            {
                "index": 0,
                "logprobs": null,
                "finish_reason": "stop"
            }
        ],
        "object": "chat.completion.chunk"
    },
    {
        "choices": [
            {
                "content_filter_results": {
                    "hate": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "self_harm": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "sexual": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "violence": {
                        "filtered": false,
                        "severity": "safe"
                    }
                },
                "delta": {
                    "content": " Hi"
                },
                "finish_reason": null,
                "index": 0,
                "logprobs": null
            }
        ],
        "created": 1728962152,
        "id": "chatcmpl-AISKGHxNUE7folNe65uZYCsLO1kab",
        "model": "gpt-4o-2024-05-13",
        "object": "chat.completion.chunk",
        "system_fingerprint": "fp_67802d9a6d"
    },
    {
        "choices": [
            {
                "content_filter_results": {
                    "hate": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "self_harm": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "sexual": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "violence": {
                        "filtered": false,
                        "severity": "safe"
                    }
                },
                "delta": {
                    "content": " There"
                },
                "finish_reason": null,
                "index": 0,
                "logprobs": null
            }
        ],
        "created": 1728962152,
        "id": "chatcmpl-AISKGHxNUE7folNe65uZYCsLO1kab",
        "model": "gpt-4o-2024-05-13",
        "object": "chat.completion.chunk",
        "system_fingerprint": "fp_67802d9a6d"
    },
    {
        "choices": [
            {
                "content_filter_results": {
                    "hate": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "self_harm": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "sexual": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "violence": {
                        "filtered": false,
                        "severity": "safe"
                    }
                },
                "delta": {
                    "content": "!"
                },
                "finish_reason": null,
                "index": 0,
                "logprobs": null
            }
        ],
        "created": 1728962152,
        "id": "chatcmpl-AISKGHxNUE7folNe65uZYCsLO1kab",
        "model": "gpt-4o-2024-05-13",
        "object": "chat.completion.chunk",
        "system_fingerprint": "fp_67802d9a6d"
    },
    {
        "choices": [
            {
                "content_filter_results": {
                    "hate": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "self_harm": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "sexual": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "violence": {
                        "filtered": false,
                        "severity": "safe"
                    }
                },
                "delta": {
                    "content": " How"
                },
                "finish_reason": null,
                "index": 0,
                "logprobs": null
            }
        ],
        "created": 1728962152,
        "id": "chatcmpl-AISKGHxNUE7folNe65uZYCsLO1kab",
        "model": "gpt-4o-2024-05-13",
        "object": "chat.completion.chunk",
        "system_fingerprint": "fp_67802d9a6d"
    },
    {
        "choices": [
            {
                "content_filter_results": {
                    "hate": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "self_harm": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "sexual": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "violence": {
                        "filtered": false,
                        "severity": "safe"
                    }
                },
                "delta": {
                    "content": " Can"
                },
                "finish_reason": null,
                "index": 0,
                "logprobs": null
            }
        ],
        "created": 1728962152,
        "id": "chatcmpl-AISKGHxNUE7folNe65uZYCsLO1kab",
        "model": "gpt-4o-2024-05-13",
        "object": "chat.completion.chunk",
        "system_fingerprint": "fp_67802d9a6d"
    },
    {
        "choices": [
            {
                "content_filter_results": {
                    "hate": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "self_harm": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "sexual": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "violence": {
                        "filtered": false,
                        "severity": "safe"
                    }
                },
                "delta": {
                    "content": " I"
                },
                "finish_reason": null,
                "index": 0,
                "logprobs": null
            }
        ],
        "created": 1728962152,
        "id": "chatcmpl-AISKGHxNUE7folNe65uZYCsLO1kab",
        "model": "gpt-4o-2024-05-13",
        "object": "chat.completion.chunk",
        "system_fingerprint": "fp_67802d9a6d"
    },
    {
        "choices": [
            {
                "content_filter_results": {
                    "hate": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "self_harm": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "sexual": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "violence": {
                        "filtered": false,
                        "severity": "safe"
                    }
                },
                "delta": {
                    "content": " Help"
                },
                "finish_reason": null,
                "index": 0,
                "logprobs": null
            }
        ],
        "created": 1728962152,
        "id": "chatcmpl-AISKGHxNUE7folNe65uZYCsLO1kab",
        "model": "gpt-4o-2024-05-13",
        "object": "chat.completion.chunk",
        "system_fingerprint": "fp_67802d9a6d"
    },
    {
        "choices": [
            {
                "content_filter_results": {
                    "hate": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "self_harm": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "sexual": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "violence": {
                        "filtered": false,
                        "severity": "safe"
                    }
                },
                "delta": {
                    "content": " You"
                },
                "finish_reason": null,
                "index": 0,
                "logprobs": null
            }
        ],
        "created": 1728962152,
        "id": "chatcmpl-AISKGHxNUE7folNe65uZYCsLO1kab",
        "model": "gpt-4o-2024-05-13",
        "object": "chat.completion.chunk",
        "system_fingerprint": "fp_67802d9a6d"
    },
    {
        "choices": [
            {
                "content_filter_results": {
                    "hate": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "self_harm": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "sexual": {
                        "filtered": false,
                        "severity": "safe"
                    },
                    "violence": {
                        "filtered": false,
                        "severity": "safe"
                    }
                },
                "delta": {
                    "content": "?"
                },
                "finish_reason": null,
                "index": 0,
                "logprobs": null
            }
        ],
        "created": 1728962152,
        "id": "chatcmpl-AISKGHxNUE7folNe65uZYCsLO1kab",
        "model": "gpt-4o-2024-05-13",
        "object": "chat.completion.chunk",
        "system_fingerprint": "fp_67802d9a6d"
    },
];
const server = http.createServer((req, res) => {
    // Check if the request path is /stream

    if (req.url === '/stream' && req.method === 'POST') {
        // Set the response headers
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*',
        });

        let counter = 0;
        const interval = setInterval(() => {
            
            if ( test.length - 1 === counter ) {
                clearInterval(interval);
                res.end();
            } else {
                res.write( JSON.stringify( test[counter] ) );
                counter++;
            }
        }, 100);
    } else {
        // Handle other requests
        res.writeHead(404);
        res.end('Not found');
    }
});
// Listen on port 3000
server.listen(3000, () => {
    console.log('Server listening on port 3000');
});
