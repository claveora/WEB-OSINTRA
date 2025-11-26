<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Position;
use App\Models\AuditLog;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function index()
    {
        // Return positions ordered by creation id to preserve insertion order
        return response()->json(Position::orderBy('id')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:positions,name',
            'description' => 'nullable|string',
        ]);

        $position = Position::create($validated);
        AuditLog::log('create_position', "Created position: {$position->name}");

        return response()->json(['position' => $position, 'message' => 'Position created'], 201);
    }

    public function update(Request $request, Position $position)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:positions,name,' . $position->id,
            'description' => 'nullable|string',
        ]);

        $position->update($validated);
        AuditLog::log('update_position', "Updated position: {$position->name}");

        return response()->json(['position' => $position, 'message' => 'Position updated']);
    }

    public function destroy(Position $position)
    {
        $name = $position->name;
        $position->delete();
        AuditLog::log('delete_position', "Deleted position: {$name}");

        return response()->json(['message' => 'Position deleted']);
    }
}
