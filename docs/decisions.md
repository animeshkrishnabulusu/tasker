Phase 0:
- Signals preferred over RxJS for state
- HttpClient kept at service boundary
Phase 1:
- Services own signals
- Components consume readonly signals
- No RxJS-based state
